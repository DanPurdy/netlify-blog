const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);

  const result = await graphql(`
    {
      allMdx(
        filter: { internal: { contentFilePath: { regex: "/content/blog/" } } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: `blog${post.fields.slug}`,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        slug: post.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    // Calculate reading time
    const readingTime = calculateReadingTime(node.body || '');
    createNodeField({
      name: `readingTime`,
      node,
      value: readingTime,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Mdx implements Node {
      fields: MdxFields
    }

    type MdxFields {
      slug: String
      readingTime: String
    }
  `);
};

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();

  // Remove the existing SVG rule from file-loader
  config.module.rules = config.module.rules.map(rule => {
    if (rule.test && rule.test.toString().includes('svg')) {
      return {
        ...rule,
        exclude: /content\/assets\/svg\/.*\.svg$/,
      };
    }
    return rule;
  });

  // Add SVGR loader for our SVG icons
  config.module.rules.push({
    test: /content\/assets\/svg\/.*\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    ],
  });

  actions.replaceWebpackConfig(config);
};

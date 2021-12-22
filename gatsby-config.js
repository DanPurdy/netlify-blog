module.exports = {
  siteMetadata: {
    // edit below
    title: `Dan Purdy Senior Fullstack Engineer`,
    author: `Dan Purdy`,
    description: `Portfolio and development blog of Dan Purdy, a senior fullstack engineer from London, UK. Focusing on JavaScript, Node, React and more!`,
    siteUrl: `https://dpurdy.me`,
    image:
      'https://res.cloudinary.com/huxr6hrje/image/upload/v1612228100/Priority%20Campaigns/me-portrait.png',
    imageAlt: 'Portfolio image with a pixel art represenation of Dan Purdy',
    social: {
      twitter: `DanPurdy0`,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dan Purdy`,
        short_name: `Dan Purdy`,
        start_url: `/`,
        background_color: `#081635`,
        theme_color: `#081635`,
        display: `minimal-ui`,
        icon: `content/assets/svg/favicon.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-feed-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/personal_details.md`,
        name: `personal-details`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/experience`,
        name: `experience`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              colorTheme: 'Monokai',
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Lato',
              variants: ['700'],
            },
            {
              family: 'Noto Sans JP',
              variants: ['400'],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /content\/assets\/svg\/.*\.svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-44111291-1`,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
};

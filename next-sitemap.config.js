/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  // !STARTERCONF Change the siteUrl
  siteUrl: '',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

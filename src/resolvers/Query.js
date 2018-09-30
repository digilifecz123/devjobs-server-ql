const { getUserId } = require('../utils');

const Query = {
  companies(parent, args, ctx, info) {
    return ctx.db.query.companies({}, info);
  },

  company(parent, { id }, ctx, info) {
    return ctx.db.query.company({ where: { id } }, info);
  },

  jobs(parent, { filter }, ctx, info) {
    const where = filter
      ? {
        AND: filter.map(x => ({
          OR: [{ description_contains: x }, { tags_contains: x }],
        })),
      }
      : {};
    return ctx.db.query.jobs({ where, orderBy: 'createdAt_DESC' }, info);
  },

  job(parent, { id }, ctx, info) {
    return ctx.db.query.job({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { Query };

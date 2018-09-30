const { getUserId } = require('../../utils');

const post = {
  async createJob(
    parent,
    { title, description, location, tags, workingTime, companyId },
    ctx,
    info,
  ) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createJob(
      {
        data: {
          title,
          description,
          location,
          workingTime,
          tags,
          owner: {
            connect: { id: userId },
          },
          company: {
            connect: { id: companyId },
          },
        },
      },
      info,
    );
  },

  async updateJob(
    parent,
    { title, description, location, tags, workingTime, companyId, id },
    ctx,
    info,
  ) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.updateJob(
      {
        where: { id },
        data: {
          title,
          description,
          location,
          workingTime,
          tags,
          owner: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async createCompany(
    parent,
    {
      companyName,
      companyDescription,
      companyLogoUrl,
      companyCoverImageUrl,
      contactLinkOrEmail,
      companyWebsite,
    },
    ctx,
    info,
  ) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createCompany(
      {
        data: {
          companyName,
          companyDescription,
          companyLogoUrl,
          companyCoverImageUrl,
          contactLinkOrEmail,
          companyWebsite,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async updateCompany(
    parent,
    {
      companyName,
      companyDescription,
      companyLogoUrl,
      companyCoverImageUrl,
      contactLinkOrEmail,
      companyWebsite,
      id,
    },
    ctx,
    info,
  ) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createCompany(
      {
        where: { id },
        data: {
          companyName,
          companyDescription,
          companyLogoUrl,
          companyCoverImageUrl,
          contactLinkOrEmail,
          companyWebsite,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async deleteJob(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const jobExists = await ctx.db.exists.Job({
      id,
      owner: { id: userId },
    });
    if (!jobExists) {
      throw new Error("Post not found or you're not the author");
    }

    return ctx.db.mutation.deleteJob({ where: { id } });
  },
};

module.exports = { post };

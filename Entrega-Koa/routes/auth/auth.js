export const isAuthenticated = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.redirect('/login');
  }
};

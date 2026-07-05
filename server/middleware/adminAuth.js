export const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey && adminKey === process.env.ADMIN_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

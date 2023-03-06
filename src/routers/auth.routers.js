
router.post("/signup",authController.creatAccount);
router.post("/login",checkUser,authController.Login);
export default router
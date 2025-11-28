import express from "express";
import { getUsers, Login, Logout, Register } from "../controller/User.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  addProject,
  deleteProject,
  editProject,
  getDetailProject,
  getProject,
  getProjectBySlug,
} from "../controller/Project.js";
import {
  addDocument,
  deleteDoc,
  editDocument,
  getDocDetail,
  getDocument,
} from "../controller/Document.js";
import {
  addExp,
  deleteExp,
  editExp,
  expDetail,
  getExp,
} from "../controller/Experience.js";
import {
  addExpDetail,
  deleteExpDetail,
  editExpDetail,
  getExpDetail,
} from "../controller/ExpDetail.js";
import {
  addCert,
  deleteCert,
  editCert,
  getCert,
  getDetailCert,
} from "../controller/Certificate.js";
import {
  addSkill,
  deleteSkill,
  editSkill,
  getDetailSkill,
  getSkill,
} from "../controller/Skill.js";

const router = express.Router();

//user routes
router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//project routes
router.post("/add-project", verifyToken, addProject);
router.get("/get-project", verifyToken, getProject);
router.get("/get-project/:slug", verifyToken, getProjectBySlug);
router.get("/project/:projectId", verifyToken, getDetailProject); // yang ini
router.put("/get-project/:id", verifyToken, editProject);
router.delete("/get-project/:id", verifyToken, deleteProject);

//document routes
// router.get('/project/:projectId/document/', getDocument);// dengan ini
router.get("/project/:projectId/document/:docId", verifyToken, getDocDetail);
router.post("/project/:projectId/document/new", verifyToken, addDocument);
router.put("/project/:projectId/document/:docId", verifyToken, editDocument);
router.delete("/project/:projectId/document/:docId", verifyToken, deleteDoc);

//exp routes
router.get("/get-exp", verifyToken, getExp);
router.get("/get-exp/:expId", verifyToken, expDetail);
router.post("/add-exp", verifyToken, addExp);
router.put("/get-exp/:id", verifyToken, editExp);
router.delete("/get-exp/:id", verifyToken, deleteExp);

//expdetail routes
// router.get('/project/:expId/expDetail/', getExpDetail);
router.get("/get-exp/:expId/exp-detail/:expDetailId", verifyToken, getExpDetail);
router.post("/get-exp/:expId/exp-detail/new", verifyToken, addExpDetail);
router.put(
  "/get-exp/:expId/exp-detail/:expDetailId",
  verifyToken,
  editExpDetail
);
router.delete(
  "/get-exp/:expId/exp-detail/:expDetailId",
  verifyToken,
  deleteExpDetail
);

//certificate routes
router.get("/get-cert", verifyToken, getCert);
router.get("/get-cert/:id", verifyToken, getDetailCert);
router.post("/add-cert", verifyToken, addCert);
router.put("/get-cert/:id", verifyToken, editCert);
router.delete("/get-cert/:id", verifyToken, deleteCert);

//Skill routes
router.get("/get-skill", verifyToken, getSkill);
router.get("/get-skill/:id", verifyToken, getDetailSkill);
router.post("/add-skill", verifyToken, addSkill);
router.put("/get-skill/:id", verifyToken, editSkill);
router.delete("/get-skill/:id", verifyToken, deleteSkill);

export default router;

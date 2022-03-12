import nextConnect from "next-connect";
import multer from "multer";
import { getSession } from "next-auth/react";
import "path";
import path from "path";


const upload = multer({
	storage: multer.diskStorage({
		destination: "./uploads",
		filename: (req, file, cb) => cb(null, file.originalname)
	}),
	fileFilter: (req, file, cb) => {
		if (path.extname(file.originalname) !== ".md") {
			console.log("invalid file ext")
			return cb(new Error("Only .md files are allowed!"), false);
		}

		cb(null, true);
	},
});

const apiRoute = nextConnect({
	onNoMatch(req, res) {
		res.status(405).json({error: "Not allowed!"});
	},
	onError(err, req, res, next) {
		res.status(405).json({error: "Bad!"});
	}
})

const uploadMiddleware = upload.single("file");

// Make sure uploading users are logged in!
apiRoute.use(async (req, res, next) => {
	const session = await getSession({ req });
	if (session) {
		console.log("passed auth");
		next();
	} else {
		console.log("failed auth");
		res.status(401).json({data: "failed auth"});
	}
});

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
	res.status(200).json({data: "success"});
});

export const config = {
	api: {
		bodyParser: false, //Disallow body parsing, consume as stream!
	}
}

export default apiRoute;
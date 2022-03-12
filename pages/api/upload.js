import nextConnect from "next-connect";
import multer from "multer";
import { getSession } from "next-auth/react";
import "path";
import path from "path";
import database from "../../lib/database";


const upload = multer({
	storage: multer.diskStorage({
		destination: "./uploads",
		filename: async (req, file, cb) => {
			try {
				const [rows, fields] = await database.execute("INSERT INTO uploads(file_name, user_id) values (?, ?)", [file.originalname, 1]);
				cb(null, rows.insertId + ".md");
				console.log("Setting")
				req.uploadId = rows.insertId;
				console.log("set")
			} catch (err) {
				cb(err, null);
			}
		}
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
		console.log("Error thrown!", err);
		res.status(405).json({error: "Bad!"});
	}
})


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

const uploadMiddleware = upload.single("file");
apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
	console.log("TEST");
	res.status(200).json({id: req.uploadId});
});

export const config = {
	api: {
		bodyParser: false, //Disallow body parsing, consume as stream!
	}
}

export default apiRoute;
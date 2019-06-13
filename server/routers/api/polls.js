const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const Router = express.Router();
Router.use(cors());
let Poll = require("../../models/polls");

Router.get("/", function(req, res, next) {
  Poll.find({}).then(function(err, polls) {
    if (err) {
      res.json(err);
    } else {
      res.json(polls);
    }
  });
});
Router.get("/subject/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      res.json(poll.subject);
    }
  });
});
Router.post("/", function(req, res, next) {
  Poll.create(req.body)
    .then(function(result) {
      res.send(result);
    })
    .catch(() => res.status(400).send("Unable to save to database"));
});
Router.post("/subject/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      poll.subject.push(req.body);
      poll
        .save()
        .then(function(result) {
          res.json(result.subject[result.subject.length - 1]);
        })
        .catch(() => res.status(400).send("Unable to save to database"));
    }
  });
});
Router.put("/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      Poll.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(result => {
          res.json(result);
        })
        .catch(() => res.status(400).send("Unable to update database"));
    }
  });
});
Router.put("/subject/:id/put/:id2", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      const index = poll.subject.findIndex(
        subject => subject._id == req.params.id2
      );
      if (index !== -1) {
        poll.subject.splice(index, 1, {
          _id: req.params.id2,
          subjectName: req.body.subjectName,
          description: req.body.description
        });
        poll
          .save()
          .then(function(result) {
            const index = result.subject.findIndex(
              subject => subject._id == req.params.id2
            );
            res.json(result.subject[index]);
          })
          .catch(() => res.status(400).send("Unable to update data"));
      } else {
        res.status(400).send("Unable to update data");
      }
    }
  });
});
Router.delete("/:id", function(req, res, next) {
  Poll.findOneAndDelete({ _id: req.params.id }, function(err) {
    if (err) res.json(err);
    else res.send("Unable delete data");
  });
});
Router.delete("/subject/:id/delete/:id2", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      poll.subject = poll.subject.filter(
        subject => subject._id != req.params.id2
      );
      poll
        .save()
        .then(function(result) {
          res.json(result);
        })
        .catch(() => res.status(400).send("Unable delete data"));
    }
  });
});

//Upload shit
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});
const upload = multer({
  fileFilter,
  limits: {
    fileSize: 20000000
  },
  storage
});

Router.post("/upload", upload.single("file"), (req, res) => {
  Poll.findById(req.body.pollsId, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      const index = poll.subject.findIndex(
        subject => subject._id == req.body.subjectId
      );
      if (index !== -1) {
        poll.subject.splice(index, 1, {
          _id: req.body.subjectId,
          subjectName: poll.subject[index].subjectName,
          images: req.file.filename,
          description: poll.subject[index].description
        });
        poll
          .save()
          .then(function(result) {
            const index = result.subject.findIndex(
              subject => subject._id == req.body.subjectId
            );
            res.json(result.subject[index]);
          })
          .catch(() => res.status(400).send("Unable to update data"));
      } else {
        res.status(400).send("Unable to update data");
      }
    }
  });
});

Router.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Allow file size is 2MB" });
    return;
  }
});
module.exports = Router;

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
Router.get("/check/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.json({ status: false });
    else {
      res.json({ status: true });
    }
  });
});
Router.get("/subject/mashes/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      let mashes = [];
      let a = 0;
      let b = a + 1;
      let x = poll.subject.length;
      let y = x ** 2 - (x ** 2 / 2 + x / 2);
      for (let i = 0; i < y; i++) {
        mashes[i] = { subjecta: poll.subject[a], subjectb: poll.subject[b] };
        if (b == x - 1) {
          b = a + 1;
          a = a + 1;
        }
        b = b + 1;
      }
      //Ramdomize it
      for (var i = mashes.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = mashes[i];
        mashes[i] = mashes[j];
        mashes[j] = temp;
      }
      res.json(mashes);
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
      if (poll.rank.length > 0) {
        poll.rank = [];
      }
      poll.subject.push({ ...req.body, images: "" });
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
      Poll.findOneAndUpdate(
        { _id: req.params.id },
        {
          _id: req.params.id,
          pollName: req.body.pollName,
          rank: poll.rank,
          subject: poll.subject
        },
        { new: true }
      )
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
      if (poll.rank.length > 0) {
        poll.rank = [];
      }
      const index = poll.subject.findIndex(
        subject => subject._id == req.params.id2
      );
      if (index !== -1) {
        poll.subject.splice(index, 1, {
          _id: req.params.id2,
          subjectName: req.body.subjectName,
          images: req.body.images,
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
Router.put("/subject/:id/removeimage/:id2", function(req, res, next) {
  Poll.findById(req.params.id, async function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      const index = poll.subject.findIndex(
        subject => subject._id == req.params.id2
      );
      if (index !== -1) {
        await unlinkAsync("server/uploads/" + poll.subject[index].images);
        poll.subject.splice(index, 1, {
          _id: req.params.id2,
          subjectName: poll.subject[index].subjectName,
          images: "",
          description: poll.subject[index].description
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
Router.delete("/:id", async function(req, res, next) {
  await Poll.findById(req.params.id, async function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      const subjectLen = poll.subject.length;
      if (subjectLen > 0) {
        for (let index = 0; index < subjectLen; index++) {
          if (poll.subject[index].images != "") {
            await unlinkAsync("server/uploads/" + poll.subject[index].images);
          }
        }
      }
    }
  });
  Poll.findOneAndDelete({ _id: req.params.id }, function(err) {
    if (err) res.json(err);
    else res.send("Unable delete data");
  });
});
Router.delete("/subject/:id/delete/:id2", function(req, res, next) {
  Poll.findById(req.params.id, async function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      if (poll.rank.length > 0) {
        poll.rank = [];
      }
      const index = poll.subject.findIndex(
        subject => subject._id == req.params.id2
      );
      if (index !== -1) {
        if (poll.subject[index].images != "") {
          await unlinkAsync("server/uploads/" + poll.subject[index].images);
        }
      } else {
        res.status(400).send("Unable to update data");
      }
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

const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

const upload = multer({
  fileFilter,
  limits: {
    fileSize: 20000000
  },
  storage,
  //Shitty way to prevent upload if id not found
  onFileUploadStart: function(file, req, res) {
    if (!poll) return false;
    else {
      const index = poll.subject.findIndex(
        subject => subject._id == req.body.subjectId
      );
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  onFileUploadComplete: async function(file, req, res) {
    if (!poll) await unlinkAsync(req.file.path);
    else {
      const index = poll.subject.findIndex(
        subject => subject._id == req.body.subjectId
      );
      if (index !== -1) {
      } else {
        await unlinkAsync(req.file.path);
      }
    }
  }
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
//Saved mash result
Router.get("/rank/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      res.json(poll.rank);
    }
  });
});

Router.post("/rank/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      poll.rank.push(req.body);
      poll
        .save()
        .then(function() {
          res.status(200).send("Saved to database");
        })
        .catch(() => res.status(400).send("Unable to save to database"));
    }
  });
});
Router.delete("/rank/:id", function(req, res, next) {
  Poll.findById(req.params.id, function(err, poll) {
    if (!poll) res.status(404).send("Data is not found");
    else {
      if (poll.rank.length > 0) {
        poll.rank = [];
        poll
          .save()
          .then(function() {
            res.status(200).send("Clered");
          })
          .catch(() => res.status(400).send("Unable to save database"));
      }
    }
  });
});
module.exports = Router;

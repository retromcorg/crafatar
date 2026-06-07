var helpers = require("../helpers");
var skins = require("../skins");

// GET skin model request
module.exports = function(req, callback) {
  var userId = (req.url.path_list[1] || "").split(".")[0];
  var rid = req.id;

  // check for extra paths
  if (req.url.path_list.length > 2) {
    callback({
      status: -2,
      body: "Invalid Path",
      code: 404
    });
    return;
  }

  // strip dashes
  userId = userId.replace(/-/g, "");
  if (!helpers.id_valid(userId)) {
    callback({
      status: -2,
      body: "Invalid UUID"
    });
    return;
  }

  try {
    helpers.get_skin_model(rid, userId, function(err, status, slim, skin_hash) {
      callback({
        status: status,
        body: JSON.stringify({
          uuid: userId,
          slim: slim,
          model: slim ? "slim" : "classic",
          skin: !!skin_hash
        }),
        type: "application/json; charset=utf-8",
        skin_slim: slim,
        err: err
      });
    });
  } catch(e) {
    callback({
      status: -1,
      err: e
    });
  }
};

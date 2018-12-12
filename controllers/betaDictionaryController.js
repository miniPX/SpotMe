const Firestore = require('@google-cloud/firestore'),
    config = require('../config.json');

const firestore = new Firestore({
  projectId: config.firestore_projectId,
  keyFilename: config.firestore_keyFileName,
});


let documentRef = firestore.collection('BetaDictionaryCA').doc('Joshua Tree');
//to hide the warning
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

exports.test = async function(req, res) {//increment search through db
    try {
        var name = "";
        if (!req.params.name) {
            res.send('oops!'); //spiff up later
        }
        else {
            name = req.params.name;
        }

        var collectionRef = firestore.collection('BetaDictionaryCA').doc('Joshua Tree').collection('Bouldering');
        //going to have to add one more layer here
        var collectionRef = collectionRef.doc(name);
        var returnArray = [];
        var ret = {};
        
        //increment through locations tree
        var result = await collectionRef.get().then(function(doc) {
            if (doc.exists) {
                var check = doc.data();
                if (!check.subs) {
                    return false;
                }
                else {
                    return check;
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            return false;
        });

        //arrive at routes
        if (!result) {
            var result = await collectionRef.collection('Routes').get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        return false;
                    }  

                    var routelist = [];
                
                    snapshot.forEach(doc => {
                        var route = {};
                        route.name = doc.id;
                        route.info = doc.data();
                        routelist.push(route);
                    });

                    return routelist;
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                    return false; 
                });
        }

        var returnobj = {};
        res.statusCode = 200; 
        returnobj.success = true;

        if (result == false) {
            res.statusCode = 401;
            returnobj.success = false;
            returnobj.message = "Not found as area or location";
        }
        else if (result['subs']) {
            returnobj.sublist = result['subs'];
        }
        else if (Array.isArray(result)) {
            returnobj.routes = result;
        }

        res.json(returnobj);
    }
    catch(err) {
        res.json({error: err.toString()}); 
    }
};

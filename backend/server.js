const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const databaseRoutes = express.Router();
const spawn = require("child_process").spawn;
const bcrypt = require('bcryptjs')
const PORT = 4000;

let Person = require('./person.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/team-y-nots', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

databaseRoutes.route('/login').post(function(req, res) {
    Person.findOne({company_id: req.body.company_id})
        .then(person => {
            
            if (!person) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, person.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});

databaseRoutes.route('/login/grabId').post(function(req, res) {
    Person.findOne({company_id: req.body.company_id})
    .then(person => {
        
        if (!person) res.sendStatus(204);
        else {
            res.send(person._id);
        }
    });
});

databaseRoutes.route('/validate').post(function(req, res) {
    Person.findOne({company_id: req.body.company_id})
        .then(person => person ? res.sendStatus(204) : res.sendStatus(200))
});

databaseRoutes.route('/register').post(function(req, res) {
    let register = new Person(req.body);
    register.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store in database!!")
        });
});

databaseRoutes.route('/').get(function(req, res) {
    Person.find(function(err, persons) {
        if (err) {
            console.log(err);
        } else {
            console.log(persons);
            res.json(persons);
        }
    });
});

databaseRoutes.route('/profile/:id').get(function(req, res) {
    let id = req.params.id;
    Person.findById(id, function(err, person) {
        res.json(person);
    })
})

databaseRoutes.route('/home/:id').get(function(req, res) {

    let id = req.params.id;

    Person.findById(id, function(err, person) {
            //console.log(person);
            console.log(id);
            var middleJSON = JSON.stringify(person);
            middleJSON = JSON.parse(middleJSON);
            var company_id = middleJSON['company_id'].toString();
            const pythonProcess = spawn('python',["do_gn_on_id.py", company_id]);
            pythonProcess.stdout.on('data', (data_received_from_python) => {
            
            pythonOutput = data_received_from_python.toString();

            var graph = {
                nodes: [],
                edges: [],
                list_of_colors: [],
                full_network_and_community_data: []
              };

            var splitData = pythonOutput;
            splitData = splitData.split('|');
            var communityData = splitData[0];
            var edgeData = splitData[1];
            var networkAndCommunityData = splitData[2];

            var nodes = [];
            var edges = [];

            var splitCommunitiesAndNodes = communityData.substring(0, communityData.length - 1);
            splitCommunitiesAndNodes = splitCommunitiesAndNodes.split(',');

            var splitEdgeData = edgeData.substring(0, edgeData.length - 1);
            splitEdgeData = splitEdgeData.split(',');

            for (var i = 0; i < splitCommunitiesAndNodes.length; i+=3)
            {
              var curr_data = splitCommunitiesAndNodes[i].slice(2, -1);
              var node = {"id": curr_data, "label": curr_data,
              "title": curr_data, "shape": "dot", "fill": splitCommunitiesAndNodes[i+1].slice(1),
              "radius": splitCommunitiesAndNodes[i+2].slice(1)
            };

              nodes.push(node);
            }
           
            graph["nodes"] = graph["nodes"].concat(nodes);

            for (var i = 0; i < splitEdgeData.length; i += 2)
            {
              var edgeOne = splitEdgeData[i].slice(2, -1);
              var edgeTwo = splitEdgeData[i+1].slice(2, -1);

              /*if (i + 1 == splitEdgeData.length - 1)
              {
                  edgeTwo = splitEdgeData[i+1].slice(2, -2);
              }*/

               var edge = {"source": edgeOne, "target": edgeTwo};
               edges.push(edge);
            }

            graph["edges"] = graph["edges"].concat(edges); 
            
            

            colors = [
                "blue", "green", "red", "yellow", "orange", "purple", "pink", "brown", "black", "indigo", "scarlet"
              ];

            graph["list_of_colors"] = graph["list_of_colors"].concat(colors); 

            
            var splitNetworkAndCommunityData = networkAndCommunityData.substring(1, networkAndCommunityData.length - 3);
            splitNetworkAndCommunityData = splitNetworkAndCommunityData.split(',');
            
            var networkDiagnosedPercentage = parseFloat(splitNetworkAndCommunityData[1]) / parseFloat(splitNetworkAndCommunityData[0]);
            var networkRecoveredPercentage = parseFloat(splitNetworkAndCommunityData[2]) / parseFloat(splitNetworkAndCommunityData[0]);
            var communityDiagnosedPercentage = parseFloat(splitNetworkAndCommunityData[4]) / parseFloat(splitNetworkAndCommunityData[3]);
            var communityRecoveredPercentage = parseFloat(splitNetworkAndCommunityData[5]) / parseFloat(splitNetworkAndCommunityData[3]);
            splitNetworkAndCommunityData.push((networkDiagnosedPercentage * 100).toPrecision(3));
            splitNetworkAndCommunityData.push((networkRecoveredPercentage * 100).toPrecision(3));
            splitNetworkAndCommunityData.push((communityDiagnosedPercentage * 100).toPrecision(3));
            splitNetworkAndCommunityData.push((communityRecoveredPercentage * 100).toPrecision(3));

            splitNetworkAndCommunityData[0] = parseFloat(splitNetworkAndCommunityData[0]);
            splitNetworkAndCommunityData[1] = parseFloat(splitNetworkAndCommunityData[1]);
            splitNetworkAndCommunityData[2] = parseFloat(splitNetworkAndCommunityData[2]);
            splitNetworkAndCommunityData[3] = parseFloat(splitNetworkAndCommunityData[3]);
            splitNetworkAndCommunityData[4] = parseFloat(splitNetworkAndCommunityData[4]);
            splitNetworkAndCommunityData[5] = parseFloat(splitNetworkAndCommunityData[5]);
            
            graph["full_network_and_community_data"] = graph["full_network_and_community_data"].concat(splitNetworkAndCommunityData);
            console.log(edges);
            console.log(nodes);

            res.send(graph);
        
         });
        
    });


});

databaseRoutes.route('/update/:id').post(function(req, res) {
    Person.findById(req.params.id, function(err, person) {
        if (!person)
            res.status(404).send("data is not found");
        else
            person.first_name = req.body.first_name;
            person.last_name = req.body.last_name;
            person.phone = req.body.phone;
            person.email = req.body.email;            
            person.diagnosed_with_covid = req.body.diagnosed_with_covid;
            person.recovered_from_covid = req.body.recovered_from_covid;
            person.list_of_ids_exposed = req.body.list_of_ids_exposed;
            person.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

/*databaseRoutes.route('/add').post(function(req, res) {
    let person = new Person(req.body);
    person.save()
        .then(person => {
            res.status(200).json({'person': 'person added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});*/

app.use('/team-y-nots', databaseRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

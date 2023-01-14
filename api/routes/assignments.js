let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        res.send(assignments);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.prof = req.body.prof;
    assignment.description = req.body.description;
    assignment.matiere = req.body.matiere;
    assignment.classe = req.body.classe;
    assignment.image = req.body.image;
    assignment.note = null;

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}

// récupère le plus grand id (GET)
function getHighestId(req, res){
    let highestId = 0;

    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }

        for(let i = 0; i < assignments.length; i++){
            let foundId = parseInt(assignments[i].id);
            if(foundId > highestId){
                highestId = foundId;
            }
        }

        res.send(highestId.toString());
    });
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getHighestId };

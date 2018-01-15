var mongoose = require('mongoose'),
    schema   = mongoose.Schema,
    
    IncidentSchema = new schema({
        link: String,
        incNum: String,
        date: String,
        state: String,
        desc: String
    }, {collection: 'Incident'});

    var Incident = mongoose.model('Incident', IncidentSchema);
    module.exports = Incident;
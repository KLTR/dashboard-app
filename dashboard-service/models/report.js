var mangoose = require('mongoose'),
    schema   = mongoose.Schema,

    ReportSchema = new schema({
        date: {type:Date, required: true, default: currDate()},
        mcafee: Number,
        teknas: Number,
        snow: Number,
        umbrella: Number,
        reputationList: Number,
        behavioral: Number,
        DGA: Number,
        fileAnalysis: Number,
        LM: Number,
        EP: Number,
        suspiciousDestination: Number,
        suspiciousBinariesOT: Number,
        newSuspiciousBinary: Number,
        newVulnerableFile: Number,
        vulnerableBinaries: Number,
        vulnerableFileWasFound: Number
    }, {collection: 'Report'});

    var Report = mongoose.model('Report', ReportSchema);
    module.exports = Report;
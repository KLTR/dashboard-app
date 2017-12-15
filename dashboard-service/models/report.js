var mongoose = require('mongoose'),
    schema   = mongoose.Schema,
    dateFormat = require('dateformat'),
    now = new Date(),

    ReportSchema = new schema({
        date: {type: String, required: true, default: dateFormat(now, "mmmm dS, yyyy")},
        jobId: String,
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
        vulnerableFileWasFound: Number,
        tpsFindings: Number,
        ziftenFindings: Number,
        mcafeeFindings: Number,
        userFindings: Number,
        adware: Number,
        virus: Number,
        mail: Number
    }, {collection: 'Report'});

    var Report = mongoose.model('Report', ReportSchema);
    module.exports = Report;
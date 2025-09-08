const mongoose = require('mongoose')
const Schema = mongoose.Schema



const surveySchema = new Schema({
  name: { type: String },
  resType: { type: String },
  civilStatus: { type: String },
  sex: { type: String },
  age: { type: Number },
  hhMember: { type: String },

  fishR: { type: String },
  boatR: { type: String },

  nameAssoc: { type: String},
  totalMember: { type: String}, //changed to string

  province: { type: String },
  municipality: { type: String },
  district: { type: String },  //added
  baranggay: { type: String },

  projectReceived: { type: String },
  scale: {type: String},
  specProject: { type: String},
  specRemarks: { type: String},
  specOther: { type: String},
  otherProject: { type: String},

  
  mainIncome: { type: String },
  otherIncome: { type: String },
  noUnitsReceived: { type: String }, //changed to string
  dateReceived: { type: String },  //changed date to string

  lat: { type: Number},
  lon: { type: Number},



  quantity: { type: String },
  quantityReason: { type: String },
  quantityRating: { type: Number, min: 1, max: 5 },
  quality: { type: String },
  qualityReason: { type: String },
  qualityRating: { type: Number, min: 1, max: 5,  },




  q2: { type: String },
  q2Reason: { type: String },
  timelinessRating: { type: Number, min: 1, max: 5 },
  uponRequest: { type: String },
  duration: {type: String},




  q3: { type: String },
  q3Reason: { type: String },
  challenges: { type: String },
  relevanceRating: { type: Number, min: 1, max: 5,  },

  q4: { type: String },
  q4Reason: { type: String },
  q5: { type: String },
  q5Reason: { type: String },
  coherenceRating: { type: Number, min: 1, max: 5,  },
  q6: { type: String },
  q6Reason: { type: String },
  q7Satisfied: { type: String },
  q7_1: { type: String},
  q7_1Reason: { type: String },
  satisfactionRating: { type: Number, min: 1, max: 5,  },
  q7_2: { type: String },
  q7_2Reason: { type: String },
  q8: { type: String },
  q8Reason: { type: String },

  q9_1: { type: String },
  q9_1Spec: { type: String },
  q9_2: { type: String },
  q9_3: { type: String },
  q9_4: { type: String},
  q9_5: { type: String },
  q9_6: { type: String},
  q9_7: { type: String },
  q9_8: { type: String },
  q9_9: { type: String },
  q9_10: { type: String },
  q9_11: { type: [String], default: [] },
  q9_11other: { type: String },
  q9_12: { type: String },
  q9_12Spec: { type: String },
  q9_13: { type: String},
  q9_13other: { type: String },
  q9_14: { type: String},
  
  impactRating: { type: Number, min: 1, max: 5,  },

  q10_e: { type: String },
  q10: { type: String },
  q10Reason: { type: String },
  q10_1: { type: String },
  sustainabilityRating: { type: Number, min: 1, max: 5,  },


  q11: { type: String },
  q11_1: { type: String },
  q11_1spec: { type: String},
  q12: { type: String },
  note: { type: String },
  evaluator: { type: String }
},
{ timestamps: true });

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;

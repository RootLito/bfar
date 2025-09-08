const Survey = require("../models/surveyModel");

// Get all usersurveys
const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    if (surveys.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ message: "An error occurred Ohh yeahhh" });
  }
};

// Get single survey
const getSurveyById = async (req, res) => {
  const surveyId = req.params.id;

  try {
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(survey);
  } catch (err) {
    return res.status(500).json({ message: "An error occured", error: err });
  }
};

// Create a new survey
const createSurvey = async (req, res) => {
  try {
    const {
      name,
      resType,
      civilStatus,
      sex,
      age,
      hhMember,

      fishR,
      boatR,

      nameAssoc,
      totalMember,

      province,
      municipality,
      district,
      baranggay,

      projectReceived,
      scale,
      specProject,
      specOther,
      specRemarks,
      otherProject,

      mainIncome,
      otherIncome,
      noUnitsReceived,
      dateReceived,

      lat,
      lon,

      quantity,
      quantityReason,
      quantityRating,
      quality,
      qualityReason,
      qualityRating,

      q2,
      q2Reason,
      timelinessRating,
      uponRequest,
      duration,

      q3,
      q3Reason,
      challenges,
      relevanceRating,

      q4,
      q4Reason,

      q5,
      q5Reason,
      coherenceRating,

      q6,
      q6Reason,

      q7Satisfied,
      q7_1,
      satisfactionRating,
      q7_2,
      q7_2Reason,

      q8,
      q8Reason,

      q9_1,
      q9_1Spec,
      q9_2,
      q9_3,
      q9_4,
      q9_5,
      q9_6,
      q9_7,
      q9_8,
      q9_9,
      q9_10,
      q9_11,
      q9_11other,
      q9_12,
      q9_12Spec,
      q9_13,
      q9_13other,
      q9_14,
      impactRating,

      q10_e,
      q10,
      q10Reason,
      q10_1,
      sustainabilityRating,
      q11,
      q11_1,
      q12,
      note,
      evaluator,
    } = req.body;

    const newSurvey = new Survey({
      name,
      resType,
      civilStatus,
      sex,
      age,
      hhMember,

      fishR,
      boatR,

      nameAssoc,
      totalMember,

      province,
      municipality,
      district,
      baranggay,

      projectReceived,
      scale,
      specProject,
      specOther,
      specRemarks,
      otherProject,

      mainIncome,
      otherIncome,
      noUnitsReceived,
      dateReceived,

      lat,
      lon,

      quantity,
      quantityReason,
      quantityRating,
      quality,
      qualityReason,
      qualityRating,

      q2,
      q2Reason,
      timelinessRating,
      uponRequest,
      duration,

      q3,
      q3Reason,
      challenges,
      relevanceRating,

      q4,
      q4Reason,

      q5,
      q5Reason,
      coherenceRating,

      q6,
      q6Reason,

      q7Satisfied,
      q7_1,
      satisfactionRating,
      q7_2,
      q7_2Reason,

      q8,
      q8Reason,

      q9_1,
      q9_1Spec,
      q9_2,
      q9_3,
      q9_4,
      q9_5,
      q9_6,
      q9_7,
      q9_8,
      q9_9,
      q9_10,
      q9_11,
      q9_11other,
      q9_12,
      q9_12Spec,
      q9_13,
      q9_13other,
      q9_14,
      impactRating,

      q10_e,
      q10,
      q10Reason,
      q10_1,
      sustainabilityRating,
      q11,
      q11_1,
      q12,
      note,
      evaluator,
    });
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
};

// Update survey details
const updateSurvey = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      resType,
      civilStatus,
      sex,
      age,
      hhMember,

      fishR,
      boatR,

      nameAssoc,
      totalMember,

      province,
      municipality,
      district,
      baranggay,

      projectReceived,
      scale,
      specProject,
      specOther,
      specRemarks,
      otherProject,

      mainIncome,
      otherIncome,
      noUnitsReceived,
      dateReceived,

      lat,
      lon,

      quantity,
      quantityReason,
      quantityRating,
      quality,
      qualityReason,
      qualityRating,

      q2,
      q2Reason,
      timelinessRating,
      uponRequest,
      duration,

      q3,
      q3Reason,
      challenges,
      relevanceRating,

      q4,
      q4Reason,

      q5,
      q5Reason,
      coherenceRating,

      q6,
      q6Reason,

      q7Satisfied,
      q7_1,
      satisfactionRating,
      q7_2,
      q7_2Reason,

      q8,
      q8Reason,

      q9_1,
      q9_1Spec,
      q9_2,
      q9_3,
      q9_4,
      q9_5,
      q9_6,
      q9_7,
      q9_8,
      q9_9,
      q9_10,
      q9_11,
      q9_11other,
      q9_12,
      q9_12Spec,
      q9_13,
      q9_13other,
      q9_14,
      impactRating,

      q10_e,
      q10,
      q10Reason,
      q10_1,
      sustainabilityRating,
      q11,
      q11_1,
      q12,
      note,
      evaluator,
    } = req.body;

    const survey = await Survey.findById(id);

    if (!survey) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (name) survey.name = name;
    if (resType) survey.resType = resType;
    if (civilStatus) survey.civilStatus = civilStatus;
    if (sex) survey.sex = sex;
    if (age) survey.age = age;
    if (hhMember) survey.hhMember = hhMember;
    if (fishR) survey.fishR = fishR;
    if (boatR) survey.boatR = boatR;
    if (nameAssoc) survey.nameAssoc = nameAssoc;
    if (totalMember) survey.totalMember = totalMember;
    if (province) survey.province = province;
    if (municipality) survey.municipality = municipality;
    if (district) survey.district = district;
    if (baranggay) survey.baranggay = baranggay;
    if (projectReceived) survey.projectReceived = projectReceived;
    if (specProject) survey.specProject = specProject;
    if (specOther) survey.specOther = specOther;
    if (specRemarks) survey.specRemarks = specRemarks;
    if (noUnitsReceived) survey.noUnitsReceived = noUnitsReceived;
    if (dateReceived) survey.dateReceived = dateReceived;
    if (mainIncome) survey.mainIncome = mainIncome;
    if (otherIncome) survey.otherIncome = otherIncome;
    if (quantity) survey.quantity = quantity;
    if (quantityReason) survey.quantityReason = quantityReason;
    if (quantityRating) survey.quantityRating = quantityRating;
    if (quality) survey.quality = quality;
    if (qualityReason) survey.qualityReason = qualityReason;
    if (qualityRating) survey.qualityRating = qualityRating;
    if (q2) survey.q2 = q2;
    if (q2Reason) survey.q2Reason = q2Reason;
    if (timelinessRating) survey.timelinessRating = timelinessRating;
    if (typeof uponRequest !== "undefined") survey.uponRequest = uponRequest;
    if (q3) survey.q3 = q3;
    if (q3Reason) survey.q3Reason = q3Reason;
    if (challenges) survey.challenges = challenges;
    if (relevanceRating) survey.relevanceRating = relevanceRating;
    if (q4) survey.q4 = q4;
    if (q4Reason) survey.q4Reason = q4Reason;
    if (q5) survey.q5 = q5;
    if (q5Reason) survey.q5Reason = q5Reason;
    if (coherenceRating) survey.coherenceRating = coherenceRating;
    if (q6) survey.q6 = q6;
    if (q6Reason) survey.q6Reason = q6Reason;
    if (typeof q7Satisfied !== "undefined") survey.q7Satisfied = q7Satisfied;
    if (q7_1) survey.q7_1 = q7_1;
    if (satisfactionRating) survey.satisfactionRating = satisfactionRating;
    if (q7_2) survey.q7_2 = q7_2;
    if (q7_2Reason) survey.q7_2Reason = q7_2Reason;
    if (q8) survey.q8 = q8;
    if (q8Reason) survey.q8Reason = q8Reason;
    if (q9_1) survey.q9_1 = q9_1;
    if (q9_1Spec) survey.q9_1Spec = q9_1Spec;
    if (q9_2) survey.q9_2 = q9_2;
    if (q9_3) survey.q9_3 = q9_3;
    if (q9_4) survey.q9_4 = q9_4;
    if (q9_5) survey.q9_5 = q9_5;
    if (q9_6) survey.q9_6 = q9_6;
    if (q9_7) survey.q9_7 = q9_7;
    if (q9_8) survey.q9_8 = q9_8;
    if (q9_9) survey.q9_9 = q9_9;
    if (q9_10) survey.q9_10 = q9_10;
    if (q10_e) survey.q10_e = q10_e;
    if (q9_11) survey.q9_11 = q9_11;
    if (q9_11other) survey.q9_11other = q9_11other;
    if (q9_12) survey.q9_12 = q9_12;
    if (q9_12Spec) survey.q9_12Spec = q9_12Spec;
    if (impactRating) survey.impactRating = impactRating;
    if (q10) survey.q10 = q10;
    if (q10Reason) survey.q10Reason = q10Reason;
    if (q10_1) survey.q10_1 = q10_1;
    if (sustainabilityRating)
      survey.sustainabilityRating = sustainabilityRating;
    if (q11) survey.q11 = q11;
    if (q11_1) survey.q11_1 = q11_1;
    if (q12) survey.q12 = q12;
    if (note) survey.note = note;

    await survey.save();

    res.status(200).json(survey);
  } catch (err) {
    res.status(500).json({ message: "Error updating survey", error: err });
  }
};

// Delete a survey
const deleteSurvey = async (req, res) => {
  const surveyId = req.params.id;

  try {
    const survey = await Survey.findByIdAndDelete(surveyId);

    if (!survey) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      message: "Form deleted successfully",
      form_id: survey._id,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// DELETE multiple surveys
const deleteMultipleSurveys = async (req, res) => {
  const { ids } = req.body; 

  try {
    const result = await Survey.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} forms deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  deleteMultipleSurveys,
};

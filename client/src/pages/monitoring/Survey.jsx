import { React, useState, useEffect } from "react";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

const Survey = () => {
  const name = localStorage.getItem("name");

  const [formData, setFormData] = useState({
    form: {
      name: "",
      resType: "",
      civilStatus: "",
      sex: "",
      age: "",
      hhMember: "",
      fishR: "",
      boatR: "",
      nameAssoc: "",
      totalMember: "",
      province: "",
      municipality: "",
      district: "",
      baranggay: "",
      projectReceived: "",
      scale: "",
      specProject: "",
      specRemarks: "",
      specOther: "",
      noUnitsReceived: "",
      dateReceived: "",
      mainIncome: "",
      otherIncome: "",
      lat: "",
      lon: "",
      quantity: "",
      quantityReason: "",
      quantityRating: "",
      quality: "",
      qualityReason: "",
      qualityRating: "",
      q2: "",
      q2Reason: "",
      timelinessRating: "",
      uponRequest: "",
      duration: "",
      q3: "",
      q3Reason: "",
      challenges: "",
      relevanceRating: "",
      q4: "",
      q4Reason: "",
      q5: "",
      q5Reason: "",
      coherenceRating: "",
      q6: "",
      q6Reason: "",
      q7Satisfied: "",
      q7_1: "",
      satisfactionRating: "",
      q7_2: "",
      q7_2Reason: "",
      q8: "",
      q8Reason: "",
      q9_1: "",
      q9_1Spec: "",
      q9_2: "",
      q9_3: "",
      q9_4: "",
      q9_5: "",
      q9_6: "",
      q9_7: "",
      q9_8: "",
      q9_9: "",
      q9_10: "",
      q10_e: "",
      q9_11: [],
      q9_11other: "",
      q9_12: "",
      q9_12Spec: "",
      q9_13: "",
      q9_13other: "",
      q9_14: "",
      impactRating: "",
      q10: "",
      q10Reason: "",
      q10_1: "",
      sustainabilityRating: "",
      q11: "",
      q11_1: "",
      q11_1spec: "",
      q12: "",
      note: "",
      evaluator: name,
    },
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [areaType, setAreaType] = useState();

  const capture = [
    "shallow water payao",
    "lambaklad",
    "hook and line",
    "tuna handline",
    "multiple handline",
    "net gears",
    "motorized boat",
    "non-motorized boat",
    "marine engine",
    "fry dozer",
    "others",
  ];

  const aquaculture = [
    "freshwater tilapia fingerlings",
    "saline tilapia fingerlings",
    "milkfish fingerlings",
    "hito fingerlings",
    "post-larvae shrimp",
    "kitang fingerlings",
    "mudcrabs",
    "tilapia fingerlings for broodstock development",
    "tilapia broodstock",
    "milkfish broodstock",
    "seaweed propagules",
    "seaweed farm implements",
    "seaweed nurseries",
    "feeds",
    "fertilizer",
    "others",
  ];

  const postHarvest = [
    "freezer",
    "dryer",
    "fish stalls",
    "smokehouse",
    "vacuum sealer/packer",
    "sorter",
    "fish deboning set",
    "fish bottling set",
    "processing utensils",
    "fish cart/kiosk",
    "salt",
    "others",
  ];

  const technoDemo = [
    "Shellfish",
    "Polyculture of Milkfish and Molobicus Tilapia",
    "Monoculture of Milkfish",
    "others",
  ];

  const technologyDemonstration = ["Specify"];

  //   FETCH PROVINCES ----------------------
  useEffect(() => {
    axios
      .get("https://psgc.cloud/api/regions/1100000000/provinces")
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => {
        console.error("Error fetching provinces:", err);
      });
  }, []);

  //   FETCH CITY/MUNICIPALITY ----------------------
  const handleProvinceChange = async (e) => {
    const selectedProvince = e.target.value;
    setFormData((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        province: selectedProvince,
        municipality: "",
        baranggay: "",
      },
    }));

    try {
      const [munRes, cityRes] = await Promise.all([
        axios.get(
          `https://psgc.cloud/api/provinces/${selectedProvince}/municipalities`
        ),
        axios.get(
          `https://psgc.cloud/api/provinces/${selectedProvince}/cities`
        ),
      ]);

      setMunicipalities(munRes.data);
      setCities(cityRes.data);
    } catch (err) {
      console.error("Error fetching municipalities and cities:", err);
    }
  };

  //   FETCH BARANGAY ----------------------
  const handleMunicipalityChange = async (e) => {
    const selectedArea = e.target.value;

    const isCity = cities.some((city) => city.name === selectedArea);
    const isMunicipality = municipalities.some(
      (mun) => mun.name === selectedArea
    );
    if (isCity) {
      setAreaType("City");
    } else if (isMunicipality) {
      setAreaType("Municipality");
    } else {
      setAreaType(undefined);
    }
    setFormData((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        municipality: selectedArea,
        barangay: "",
      },
    }));
    let type = isCity ? "City" : isMunicipality ? "Municipality" : null;
    try {
      let url = "";
      if (type === "Municipality") {
        url = `https://psgc.cloud/api/municipalities/${selectedArea}/barangays`;
      } else if (type === "City") {
        url = `https://psgc.cloud/api/cities/${selectedArea}/barangays`;
      }
      if (url) {
        const response = await axios.get(url);
        setBarangays(response.data);
      }
    } catch (err) {
      console.error("Error fetching barangays:", err);
    }
  };

  // INPUT -----------------------------------
  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData((prevState) => ({
  //       form: {
  //         ...prevState.form,
  //         [name]: value,
  //       },
  //     }));
  //   };
  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]:
          type === "checkbox"
            ? checked
              ? [...prevState.form[name], value]
              : prevState.form[name].filter((item) => item !== value)
            : value,
      },
    }));
  };

  //   SUBMIT FORM ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // console.log("specRemarks:", formData.form.specRemarks);
      console.log("🔍 Form Data Before Submit:", formData.form);

      // Return early to stop actual submission while debugging
      return;
      const res = await axios.post(
        "https://bfar-server.onrender.com/survey/add",
        formData.form
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      console.log("Form submitted successfully:", res.data);
    } catch (err) {
      console.error(
        "Error occurred:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col relative bg-white rounded-md">
      <p className="text-2xl font-bold text-center mt-2 text-gray-700">
        Field Monitoring and Evaluation Form
      </p>
      {showToast && (
        <div className="toast toast-top toast-center z-2">
          <div className="alert alert-success">
            <span className="flex items-center text-green-50">
              <MdCheckCircle size={18} className="mr-2" /> Form submitted
            </span>
          </div>
        </div>
      )}

      {/* PERSONAL --------------------- */}

      <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
        <h2 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 bg-blue-950 p-2">
          BENEFICIARY INFORMATION
        </h2>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Name</p>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="name"
              value={formData.form.name}
              onChange={handleChange}
              placeholder="Last Name, First Name, Middle Initial"
              required
            />
          </div>

          <div className="flex flex-col sm:w-[150px]">
            <p className="text-sm">Respondent Type</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="resType"
              value={formData.form.resType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Individual">Individual</option>
              <option value="Group">Group</option>
              <option value="LGU">LGU</option>
            </select>
          </div>

          <div className="flex flex-col sm:w-[150px]">
            <p className="text-sm">Civil Status</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="civilStatus"
              value={formData.form.civilStatus}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
              <option value="Separated">Separated</option>
            </select>
          </div>

          <div className="flex flex-col sm:w-[150px]">
            <p className="text-sm">Sex</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="sex"
              value={formData.form.sex}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col sm:w-[150px]">
            <p className="text-sm">Age</p>
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="age"
              value={formData.form.age}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">No. of Household Members</p>
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="hhMember"
              value={formData.form.hhMember}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">FishR</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="fishR"
              value={formData.form.fishR}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Select - -
              </option>
              <option value="Registered">Registered</option>
              <option value="Registered">LGU Registered</option>
              <option value="For Registration">For Registration</option>
              <option value="For Verification">For Verification</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">BoatR</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="boatR"
              value={formData.form.boatR}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Select - -
              </option>
              <option value="Registered">Registered</option>
              <option value="Registered">LGU Registered</option>
              <option value="For Registration">For Registration</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Name of Association</p>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="nameAssoc"
              value={formData.form.nameAssoc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            {formData.form.nameAssoc.toUpperCase() !== "N/A" && (
              <>
                <p className="text-sm">Total No. of Memebers</p>
                <input
                  type="number"
                  className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                  name="totalMember"
                  value={formData.form.totalMember}
                  onChange={handleChange}
                  required
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Province</p>
            <input
              type="text"
              name="province"
              value={formData.form.province}
              onChange={handleProvinceChange}
              placeholder="Enter province"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              required
            />
            {/* <select
              name="province"
              value={formData.form.province}
              onChange={handleProvinceChange}
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              required
            >
              <option value="" disabled>
                - - Select - -
              </option>
              {provinces.map((prov) => (
                <option key={prov.code} value={prov.name}>
                  {prov.name}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex flex-col flex-1">
            <p className="text-sm">Municipality / City</p>
            <input
              type="text"
              name="municipality"
              value={formData.form.municipality}
              onChange={handleMunicipalityChange}
              placeholder="Enter municipality"
              disabled={!formData.form.province}
              required
              className={`border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none 
              ${
                !formData.form.province ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
            {/* <select
              name="municipality"
              value={formData.form.municipality}
              onChange={handleMunicipalityChange}
              disabled={!formData.form.province}
              required
              className={`border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none 
                ${!formData.form.province ? "bg-gray-200 cursor-not-allowed" : ""}`}
            >
              <option value="" disabled>
                - - Select - -
              </option>

              {cities.length > 0 && (
                <>
                  <option disabled>--- Cities ---</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </>
              )}

              {municipalities.length > 0 && (
                <>
                  <option disabled>--- Municipalities ---</option>
                  {municipalities.map((mun) => (
                    <option key={mun.code} value={mun.name}>
                      {mun.name}
                    </option>
                  ))}
                </>
              )}
            </select> */}
          </div>

          <div className="flex flex-col flex-1">
            <p className="text-sm">District</p>
            <input
              type="text"
              name="district"
              value={formData.form.district}
              onChange={handleChange}
              className={`border-1 px-3 h-[42px] rounded-md focus:outline-none ${
                (formData.form.municipality || "").trim() === ""
                  ? "cursor-not-allowed disabled:opacity-50 bg-gray-200 border-gray-400"
                  : ""
              }`}
              placeholder="Enter district"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">Barangay</p>
            <input
              type="text"
              name="baranggay"
              value={formData.form.baranggay}
              onChange={handleChange}
              className={`border-1 px-3 h-[42px] rounded-md focus:outline-none ${
                (formData.form.district || "").trim() === ""
                  ? "cursor-not-allowed disabled:opacity-50 bg-gray-200 border-gray-400"
                  : ""
              }`}
              placeholder="Enter barangay"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Project Received</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 ">
              <div className="flex gap-2 mt-2 sm:mt-0">
                <label htmlFor="capture" className="cursor-pointer">
                  Capture
                </label>
                <input
                  id="capture"
                  type="radio"
                  name="projectReceived"
                  value="Capture"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="aquaculture" className="cursor-pointer">
                  Aquaculture
                </label>
                <input
                  id="aquaculture"
                  type="radio"
                  name="projectReceived"
                  value="Aquaculture"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="postHarvest" className="cursor-pointer">
                  Post-harvest
                </label>
                <input
                  id="postHarvest"
                  type="radio"
                  name="projectReceived"
                  value="Post-harvest"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="tecnhoDemo" className="cursor-pointer">
                  Techno-demo
                </label>
                <input
                  id="tecnhoDemo"
                  type="radio"
                  name="projectReceived"
                  value="Techno-demo"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="others" className="cursor-pointer">
                  Others
                </label>
                <input
                  id="others"
                  type="radio"
                  name="projectReceived"
                  value="Others"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          {formData.form.projectReceived === "Aquaculture" && (
            <div className="flex flex-col flex-1">
              <p className="text-sm">Scale</p>

              <select
                className={`border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none`}
                name="scale"
                value={formData.form.scale}
                onChange={handleChange}
                required
                disabled={formData.form.projectReceived !== "Aquaculture"}
              >
                <option value="" disabled>
                  - - Select - -
                </option>
                <option value="Small-scale">Small-scale</option>
                <option value="Medium-scale">Medium-scale</option>
                <option value="Large-scale">Large-scale</option>
              </select>
            </div>
          )}

          {/* SPECIFIC RPOJECT==================================== */}
          <div className="flex flex-col flex-1">
            <p className="text-sm">Specific Project</p>
            {formData.form.projectReceived === "Others" ? (
              <input
                type="text"
                name="specProject"
                value={formData.form.specProject}
                onChange={handleChange}
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.specProject || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="Please specify"
              />
            ) : (
              <select
                className={`border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none`}
                name="specProject"
                value={formData.form.specProject}
                onChange={handleChange}
              >
                <option value="" disabled>
                  - - Select - -
                </option>

                {formData.form.projectReceived === "Capture" &&
                  capture.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}

                {formData.form.projectReceived === "Aquaculture" &&
                  aquaculture.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}

                {formData.form.projectReceived === "Post-harvest" &&
                  postHarvest.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                {formData.form.projectReceived === "Techno-demo" &&
                  technoDemo.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>

        {formData.form.specProject === "others" && (
          <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
            <div className="flex flex-col flex-1">
              <p className="text-sm">Others</p>
              <input
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.specOther || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                name="specOther"
                value={formData.form.specOther}
                onChange={handleChange}
                placeholder="Please specify"
                required
              />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 px-2">
          <p className="text-sm">Remarks</p>
          <input
            name="specRemarks"
            placeholder="Optional"
            type="text"
            className="border-1 px-3 h-[42px] rounded-md focus:outline-none border-gray-400"
            value={formData.form.specRemarks}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">No. of Units Received</p>
            <input
              type="number"
              className="w-full border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="noUnitsReceived"
              value={formData.form.noUnitsReceived}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">Date Received/Implemented</p>
            <input
              type="text"
              name="dateReceived"
              value={formData.form.dateReceived}
              onChange={handleChange}
              className="input w-full border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Main Source of Income</p>
            <select
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="mainIncome"
              value={formData.form.mainIncome}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Select - -
              </option>
              <option value="Fishing">Fishing</option>
              <option value="Agri">Agri</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">Other Source of Income</p>
            <input
              name="otherIncome"
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="Please specify"
              value={formData.form.otherIncome}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">Latitude</p>
            <input
              name="lat"
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              value={formData.form.lat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-sm">Longitude</p>
            <input
              name="lon"
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              value={formData.form.lon}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <p className="text-xs italic mt-2 sm:mt-0 text-center">
          Note: Please provide GPS of beneficiary and/or project implemented
        </p>

        <div className="my-10">
          <p className="font-black ml-2 text-xl text-center text-gray-700">
            Evaluation Criteria/Questions
          </p>
          <p className="ml-2 text-sm text-center">
            <i>
              <b>Rating </b>(5⭐=Very satisfied; &nbsp; 4⭐=Satisfied; &nbsp;
              3⭐=Average; &nbsp; 2⭐=Not satisfied; &nbsp; 1⭐=Disappointed)
            </i>
          </p>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 bg-blue-950 p-2">
          EFFICIENCY OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>1. Quantity and quality of goods/project received</b>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Is it sufficient/enough? (quantity)
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quantity"
                value="sufficient"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quantity"
                value="not sufficient"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.quantity === "not sufficient" && (
              <input
                name="quantityReason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.quantityReason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.quantityReason}
                onChange={handleChange}
                required={formData.form.quantity === "not sufficient"}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Quantity</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              name="quantityRating"
              value={formData.form.quantityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Is it new, has no defect or suitable? (quality)
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quality"
                value="no defects"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="quality"
                value="has defects"
                onChange={handleChange}
                required
              />
              No
            </div>
            {formData.form.quality === "has defects" && (
              <input
                name="qualityReason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.qualityReason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.qualityReason}
                onChange={handleChange}
                required={
                  formData.form.quality == "has defects"
                    ? true
                    : (formData.form.qualityReason = "")
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Quality</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="qualityRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.qualityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:px-5"></div>

        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                2. Is it timely with the fishing/production/stocking season?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q2"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q2"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            {formData.form.q2 === "No" && (
              <input
                type="text"
                name="q2Reason"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q2Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.q2Reason}
                onChange={handleChange}
                required={
                  formData.form.q2 == "No"
                    ? true
                    : (formData.form.q2Reason = "")
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Timeliness</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="timelinessRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.timelinessRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">Is it upon request?</p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="provided upon request"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="uponRequest"
                value="not provided upon request"
                onChange={handleChange}
                required
              />
              No
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">Duration</p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="duration"
                value="(<6 months)"
                onChange={handleChange}
                required
              />
              <span>{"<"} 6 months</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="duration"
                value="(<1 yeear)"
                onChange={handleChange}
                required
              />
              <span>{"<"} 1 year</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="duration"
                value="(> 1 Year)"
                onChange={handleChange}
                required
              />
              <span>{">"} 1 year</span>
            </div>
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          RELEVANCE OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>3. Did the project address your key needs and challenges?</b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q3"
                value="addressed the need"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q3"
                value="did not addressed the need"
                onChange={handleChange}
                required
              />
              No
            </div>
            {formData.form.q3 === "did not addressed the need" && (
              <input
                name="q3Reason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q3Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.q3Reason}
                onChange={handleChange}
                required={
                  formData.form.q3 == "did not addressed the need"
                    ? true
                    : (formData.form.q3Reason = "")
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Please specify the needs and challenges
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              name="challenges"
              value={formData.form.challenges}
              onChange={handleChange}
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Relevance</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="relevanceRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.relevanceRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                4. Was the project suitable for the local environment and
                economic conditions?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q4"
                value="suitable for the area"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q4"
                value="not suitable for the area"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q4 === "not suitable for the area" && (
              <input
                type="text"
                name="q4Reason"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q4Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.q4Reason}
                onChange={handleChange}
                required={
                  formData.form.q4 == "not suitable for the area"
                    ? true
                    : (formData.form.q4Reason = "")
                }
              />
            )}
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          COHERENCE OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                5. Were beneficiaries/stakeholders engaged and coordinated
                throughout the project?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q5"
                value="well-aware of the type of project given"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q5"
                value="not aware of the type of project given"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q5 === "not aware of the type of project given" && (
              <input
                name="q5Reason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q5Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.q5Reason}
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Coherence</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="coherenceRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.coherenceRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                6. Were there any complementarity or duplications with other
                projects or initiatives?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q6"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q6"
                value="none"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q6 === "Yes" && (
              <input
                name="q6Reason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q6Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If Yes, pls specify project from other NGA/NGO"
                value={formData.form.q6Reason}
                onChange={handleChange}
                required={
                  formData.form.q6 == "Yes"
                    ? true
                    : (formData.form.q6Reason = "")
                }
              />
            )}
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          EFFECTIVENESS OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>7. Satisfaction on the project received</b>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Were you satisfied with the project given?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7Satisfied"
                value="satisfied by the project"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7Satisfied"
                value="not satisfied by the project"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q7Satisfied === "not satisfied by the project" && (
              <input
                name="q7_1"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q7_1 || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, why?"
                value={formData.form.q7_1}
                onChange={handleChange}
                required={
                  formData.form.q7Satisfied == "not satisfied by the project"
                    ? true
                    : (formData.form.q7_1 = "")
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Satisfaction</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="satisfactionRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.satisfactionRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Were you able to use it as soon as given?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7_2"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q7_2"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q7_2 === "No" && (
              <input
                name="q7_2Reason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q7_2Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If No, please specify"
                value={formData.form.q7_2Reason}
                onChange={handleChange}
                required={
                  formData.form.q7_2 == "No"
                    ? true
                    : (formData.form.q7_2Reason = "")
                }
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                8. Were there problems encountered during project operation?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q8"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q8"
                value="none"
                onChange={handleChange}
                required
              />
              No
            </div>
            {formData.form.q8 === "Yes" && (
              <input
                name="q8Reason"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q8Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If yes, please specify"
                value={formData.form.q8Reason}
                onChange={handleChange}
                required={
                  formData.form.q8 == "Yes"
                    ? true
                    : (formData.form.q8Reason = "")
                }
                disabled={formData.form.q8 == "Yes" ? false : true}
              />
            )}
          </div>
        </div>

        {/* EFFICIENCY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          IMPACT OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>9. Benefits from the project</b>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Did it increase your catch/production (kg)?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_1"
                value="Yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_1"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_1"
                value="N/A"
                onChange={handleChange}
                required
              />
              N/A
            </div>

            {(formData.form.q9_1 === "Yes" || formData.form.q9_1 === "No") && (
              <input
                name="q9_1Spec"
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q9_1Spec || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="Species"
                value={formData.form.q9_1Spec}
                onChange={handleChange}
                required={
                  formData.form.q9_1 == "yes" || "no"
                    ? true
                    : formData.form.q9_1Spec == "N/A"
                }
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              - Catch/yield before project was given
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_2"
              value={formData.form.q9_2}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              - Catch/yield after project was given
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_3"
              value={formData.form.q9_3}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              - Contribution to Production in kgs.
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_4"
              value={formData.form.q9_4}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              <i>
                Aquaculture (culture period, survival rate, no. of pcs/kilo)
              </i>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_5"
              value={formData.form.q9_5}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              <i>Capture (catch/day, no. of fishing operations- day/month)</i>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_6"
              value={formData.form.q9_6}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Did it increase your income (Php)?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_7"
                value="Yes"
                onChange={handleChange}
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_7"
                value="No"
                onChange={handleChange}
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_7"
                value="N/A"
                onChange={handleChange}
              />
              N/A
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              - Income before project was given (net/operation)
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_8"
              value={formData.form.q9_8}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-10">
              - Income after project was given (net/operation)
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <input
              type="number"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q9_9"
              value={formData.form.q9_9}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Any improvement in your family/household?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_10"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_10"
                value="no"
                onChange={handleChange}
                required
              />
              No
            </div>
          </div>
        </div>

        {formData.form.q9_10 == "yes" && (
          <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
            <div className="flex-1"></div>

            <div className="flex flex-row flex-1 gap-6">
              <div className="flex gap-2 text-sm items-center">
                <input
                  type="checkbox"
                  name="q9_11"
                  value="Consumption"
                  onChange={handleChange}
                />
                Consumption
              </div>
              <div className="flex gap-2 text-sm items-center">
                <input
                  type="checkbox"
                  name="q9_11"
                  value="Education"
                  onChange={handleChange}
                />
                Education
              </div>
              <div className="flex gap-2 text-sm items-center">
                <input
                  type="checkbox"
                  name="q9_11"
                  value="Other HH needs"
                  onChange={handleChange}
                />
                Other HH needs
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Any improvement in your association?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_12"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_12"
                value="no"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_12"
                value="n/a"
                onChange={handleChange}
                required
              />
              N/A
            </div>
          </div>
        </div>
        {formData.form.q9_12 == "yes" && (
          <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
            <div className="flex-1"></div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q9_13"
                  value="Improved Skills/Knowledge"
                  onChange={handleChange}
                  required
                />
                Improved Skills/Knowledge
              </div>
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q9_13"
                  value="From Association to Coop"
                  onChange={handleChange}
                  required
                />
                From Association to Coop
              </div>
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q9_13"
                  value="others"
                  onChange={handleChange}
                  required
                />
                Others
              </div>
              {formData.form.q9_13 == "others" && (
                <input
                  type="text"
                  className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                    (formData.form.q9_13other || "").trim() === ""
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                  placeholder="Others (please specify)"
                  name="q9_13other"
                  value={formData.form.q9_13other}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              - Any improvement in the community?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_14"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_14"
                value="none"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q9_14"
                value="N/A"
                onChange={handleChange}
                required
              />
              N/A
            </div>
            {formData.form.q9_14 == "yes" && (
              <input
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q9_12Spec || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="Please specify"
                name="q9_12Spec"
                value={formData.form.q9_12Spec}
                onChange={handleChange}
                required
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Impact</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="impactRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.impactRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          SUSTAINABILITY OF THE PROJECT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>10. Is the project ongoing/operational/used?</b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10"
                value="fully utilized"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10"
                value="No"
                onChange={handleChange}
                required
              />
              No
            </div>

            {formData.form.q10 == "No" && (
              <input
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q10Reason || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                placeholder="If no, state reason why not operational/used"
                name="q10Reason"
                value={formData.form.q10Reason}
                onChange={handleChange}
                required={
                  formData.form.q10 == "No"
                    ? true
                    : (formData.form.q10Reason = "")
                }
                disabled={formData.form.q10 == "fully utilized" ? true : false}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm sm:indent-5">
              If yes, how long did the project last?
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10_1"
                value="< 3 months"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
              />
              <span>{"<"} 3 months</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10_1"
                value="< 1 year"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
              />
              <span>{"<"} 1 year</span>
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q10_1"
                value="> 1 year"
                onChange={handleChange}
                required={formData.form.q10 == "Yes" ? true : false}
              />
              <span>{">"} 1 year</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="sm:indent-5 flex-1">
              <b>
                <i>Rating on Sustainability</i>
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <select
              name="sustainabilityRating"
              className="flex-1 border-1 border-gray-400 px-3 py-2 rounded-md focus:outline-none"
              value={formData.form.sustainabilityRating}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                - - Rate - -
              </option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                11. Availability of market for the produce (fresh or processed)?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11"
                value="N/A"
                onChange={handleChange}
                required
              />
              No
            </div>
            <div className="flex gap-2 text-sm">
              <input
                type="radio"
                name="q11"
                value="Others"
                onChange={handleChange}
                required
              />
              Others
            </div>
            {formData.form.q11 == "Others" && (
              <input
                type="text"
                className={`border-1 px-3 h-[42px] rounded-md focus:outline-none placeholder-red-500 ${
                  (formData.form.q11_1spec || "").trim() === ""
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                name="q11_1spec"
                placeholder="Please specify"
                value={formData.form.q11_1spec}
                onChange={handleChange}
              />
            )}
          </div>
        </div>

        {formData.form.q11 == "yes" && (
          <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
            <div className="flex flex-col flex-1">
              <p className="text-sm sm:indent-5 flex-1">Please specify</p>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q11_1"
                  value="Vending"
                  onChange={handleChange}
                  required={formData.form.q11 == "Yes" ? true : false}
                />
                Vending
              </div>
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q11_1"
                  value="Local Market"
                  onChange={handleChange}
                  required={formData.form.q11 == "Yes" ? true : false}
                />
                Local Market
              </div>
              <div className="flex gap-2 text-sm">
                <input
                  type="radio"
                  name="q11_1"
                  value="Trader/Consignee"
                  onChange={handleChange}
                  required={formData.form.q11 == "Yes" ? true : false}
                />
                Trader/Consignee
              </div>
            </div>
          </div>
        )}

        {/* SUSTAINABILITY OF THE PROJECT================================================================= */}
        <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
          NEEDS ASSESSMENT
        </h1>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
          <div className="flex flex-col flex-1">
            <p className="text-sm">
              <b>
                12. How else can the government through BFAR help or assist you?
              </b>
            </p>
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex gap-2 text-sm">
              (credit facilitation, training, livelihood assistance, others,
              please specify)
            </div>
            <input
              type="text"
              className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
              name="q12"
              value={formData.form.q12}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex px-5 flex-col mb-5 sm:p-2">
          <p className="text-center mt-5">
            <b>
              Evaluator{"'"}s Note (cite practices, success stories and other
              observations):
            </b>
          </p>
          <textarea
            type="text"
            className="border-1 border-gray-400 p-3 h-[96px] rounded-md focus:outline-none resize-none"
            name="note"
            value={formData.form.note}
            onChange={handleChange}
          />
        </div>

        <div className="flex px-5 sm:p-2">
          <button
            type="submit"
            className="btn btn-success w-full text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;

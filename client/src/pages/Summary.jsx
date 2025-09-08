import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";
import { MdMale, MdFemale } from "react-icons/md";

import net from "./../assets/images/net.png";
import carps from "./../assets/images/carps.png";
import freezer from "./../assets/images/freezer.png";
import robotic from "./../assets/images/robotic.png";
import fishing from "./../assets/images/fishing.png";
import calendar from "./../assets/images/calendar.png";
import gender from "./../assets/images/gender.png";
import money from "./../assets/images/money.png";
import coin from "./../assets/images/coin.png";
import users from "./../assets/images/users.png";
import status from "./../assets/images/status.png";

const Summary = () => {
  const currentDate = new Date();
  const date = format(currentDate, "MM/dd/yyyy");
  const location = useLocation();
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [totalRes, setTotalRes] = useState(0);
  const [data, setData] = useState([]);
  const [provinceData, setProvinceData] = useState({});
  const [barangayData, setBarangayData] = useState({});
  const [fishingCount, setFishingCount] = useState(0);
  const [agriCount, setAgriCount] = useState(0);
  const [othersCount, setOthersCount] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [otherIncomeBarData, setOtherIncomeBarData] = useState(null);
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [incomeCounts, setIncomeCounts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [capture, setCapture] = useState(0);
  const [culture, setCulture] = useState(0);
  const [post, setPost] = useState(0);
  const [techno, setTechno] = useState(0);
  const [other, setOther] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [allMun, setAllMun] = useState([]);
  const [selectedMunicipalities, setSelectedMunicipalities] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [municipalityCounts, setMunicipalityCounts] = useState({});
  const [barangay, setBarangay] = useState([]);
  const [allBarangaysSelected, setAllBarangaysSelected] = useState(false);

  const [civilStatusCounts, setCivilStatusCounts] = useState({
    Single: 0,
    Married: 0,
    Widowed: 0,
    Divorced: 0,
    Separated: 0,
  });

  const fetchSurveys = async () => {
    try {
      const response = await axios.get(
        "https://bfar-server.onrender.com/survey"
      );
      const surveys = response.data;

      setSurveys(surveys);
      setTotalRes(surveys.length);

      // SPECIFIC PROJECTS
      const cap = surveys.filter(
        (survey) => survey.projectReceived === "Capture"
      ).length;
      setCapture(cap);

      const cul = surveys.filter(
        (survey) => survey.projectReceived === "Aquaculture"
      ).length;
      setCulture(cul);

      const po = surveys.filter(
        (survey) => survey.projectReceived === "Post-harvest"
      ).length;
      setPost(po);

      const tech = surveys.filter(
        (survey) => survey.projectReceived === "Techno-demo"
      ).length;
      setTechno(tech);

      const ot = surveys.filter(
        (survey) =>
          !["Capture", "Aquaculture", "Post-harvest", "Techno-demo"].includes(
            survey.projectReceived
          )
      ).length;
      setOther(ot);

      //  MAIN INCOME
      const fishing = surveys.filter(
        (survey) => survey.mainIncome === "Fishing"
      ).length;
      setFishingCount(fishing);

      const agri = surveys.filter(
        (survey) => survey.mainIncome === "Agri"
      ).length;
      setAgriCount(agri);

      const others = surveys.filter(
        (survey) =>
          survey.mainIncome !== "Fishing" && survey.mainIncome !== "Agri"
      ).length;
      setOthersCount(others);

      //  OTHER INCOME
      const othersInc = surveys.filter(
        (survey) =>
          survey.mainIncome !== "Fishing" && survey.mainIncome !== "Agri"
      );

      const otherIncomeCounts = othersInc.reduce((acc, survey) => {
        const income = survey.otherIncome;
        acc[income] = (acc[income] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(otherIncomeCounts);
      setIncomeTypes(labels);
      const counts = Object.values(otherIncomeCounts);
      setIncomeCounts(counts);

      const provinceCounts = surveys.reduce((acc, survey) => {
        acc[survey.province] = (acc[survey.province] || 0) + 1;
        return acc;
      }, {});
      setProvinceData(provinceCounts);

      const barangayCounts = surveys.reduce((acc, survey) => {
        acc[survey.baranggay] = (acc[survey.baranggay] || 0) + 1;
        return acc;
      }, {});
      setBarangayData(barangayCounts);

      const male = surveys.filter((survey) => survey.sex === "male").length;   //CHANGED
      const female = surveys.filter((survey) => survey.sex === "female").length;   //CHANGED
      setMaleCount(male);
      setFemaleCount(female);

      const ageGroups = {
        "17 below": 0,
        "18-24": 0,
        "25-39": 0,
        "40-59": 0,
        "60 and Above": 0,
      };
      surveys.forEach(({ age }) => {
        if (age < 18) ageGroups["17 below"]++;
        else if (age >= 18 && age <= 24) ageGroups["18-24"]++;
        else if (age >= 25 && age <= 39) ageGroups["25-39"]++;
        else if (age >= 40 && age <= 59) ageGroups["40-59"]++;
        else ageGroups["60 and Above"]++;
      });

      setData(
        Object.entries(ageGroups).map(([name, value]) => ({ name, value }))
      );

      const statCounts = {
        Single: surveys.filter((survey) => survey.civilStatus === "single")
          .length,
        Married: surveys.filter((survey) => survey.civilStatus === "married")
          .length,
        Widowed: surveys.filter((survey) => survey.civilStatus === "widowed")
          .length,
        Divorced: surveys.filter((survey) => survey.civilStatus === "divorced")
          .length,
        Separated: surveys.filter(
          (survey) => survey.civilStatus === "separated"
        ).length,
      };

      setCivilStatusCounts(statCounts);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

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

  // FILTER PROV, MUN, BAR COUNTS ---------------------------
  useEffect(() => {
    const filteredSurveys = surveys.filter((survey) =>
      selectedProvinces.includes(survey.province)
    );

    // Barangay-level count
    const barangayCounts = {};
    filteredSurveys.forEach(({ province, municipality, barangay }) => {
      const key = `${province}__${municipality}__${barangay}`;
      if (!barangayCounts[key]) {
        barangayCounts[key] = {
          province,
          municipality,
          barangay,
          count: 0,
        };
      }
      barangayCounts[key].count += 1;
    });

    // Municipality-level count
    const municipalityCounts = {};
    filteredSurveys.forEach(({ province, municipality }) => {
      const key = `${province}__${municipality}`;
      if (!municipalityCounts[key]) {
        municipalityCounts[key] = {
          province,
          municipality,
          count: 0,
        };
      }
      municipalityCounts[key].count += 1;
    });

    setBarangayData(Object.values(barangayCounts));
    setMunicipalityCounts(Object.values(municipalityCounts));
  }, [selectedProvinces, surveys]);

  const handleCheckboxChange = (provinceName) => {
    setSelectedProvinces((prev) =>
      prev.includes(provinceName)
        ? prev.filter((name) => name !== provinceName)
        : [...prev, provinceName]
    );
  };

  const handleMunicipalityChange = (name) => {
    setSelectedMunicipalities((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((n) => n !== name)
        : [...prevSelected, name]
    );
  };
  useEffect(() => {
    // Filter surveys based on selected municipalities
    const filteredSurveys = surveys.filter((survey) =>
      selectedMunicipalities.includes(survey.municipality)
    );

    // Barangay-level count for selected municipalities
    const barangayCounts = {};

    filteredSurveys.forEach(({ province, municipality, baranggay }) => {
      const key = `${province}__${municipality}__${baranggay}`;
      if (!barangayCounts[key]) {
        barangayCounts[key] = {
          province,
          municipality,
          barangay: baranggay, // assign to correct key
          count: 0,
        };
      }
      barangayCounts[key].count += 1;
    });

    // Convert object to array
    const barangayArray = Object.values(barangayCounts);

    // Set state with the array of barangay counts
    setBarangay(barangayArray);
  }, [selectedMunicipalities, surveys]);

  const filteredSurveys = surveys.filter((survey) =>
    selectedMunicipalities.includes(survey.municipality)
  );

  // Create a count map
  const barangayCounts = {};

  filteredSurveys.forEach((survey) => {
    const barangay = survey.baranggay;
    if (barangayCounts[barangay]) {
      barangayCounts[barangay]++;
    } else {
      barangayCounts[barangay] = 1;
    }
  });

  const handleSelectAllProvinces = (e) => {
    if (e.target.checked) {
      setSelectedProvinces(provinces.map((province) => province.name));
    } else {
      setSelectedProvinces([]);
    }
  };
  const allProvincesSelected =
    provinces.length > 0 && selectedProvinces.length === provinces.length;

  const handleSelectAllMunicipalities = (e) => {
    if (e.target.checked) {
      setSelectedMunicipalities(allMun.map((mun) => mun.name));
    } else {
      setSelectedMunicipalities([]);
    }
  };

  const allMunicipalitiesSelected =
    allMun.length > 0 && selectedMunicipalities.length === allMun.length;

  useEffect(() => {
    fetchSurveys();
  }, [location.pathname]);

  useEffect(() => {
    setChartData(null);

    setTimeout(() => {
      setChartData({
        series: data.map((item) => item.value),
        options: {
          chart: {
            type: "donut",
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 1500,
              animateGradually: {
                enabled: true,
                delay: 200,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 1000,
              },
            },
          },
          labels: data.map((item) => item.name),
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            itemMargin: {
              horizontal: 10,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }, 1000);
  }, [location.pathname, data]);

  //MAIN INCOME BAR CHART
  useEffect(() => {
    setTimeout(() => {
      setBarData({
        series: [
          {
            data: [
              {
                x: "Fishing",
                y: fishingCount,
                fillColor: "#FF5733",
              },
              {
                x: "Agri",
                y: agriCount,
                fillColor: "#12db35",
              },
              {
                x: "Others",
                y: othersCount,
              },
            ],
          },
        ],
        options: {
          chart: {
            type: "bar",
            height: "100%",
            toolbar: { show: false },
            padding: { bottom: 0 },
          },
          plotOptions: {
            bar: { borderRadius: 0, horizontal: true },
          },
          dataLabels: { enabled: true },
          yaxis: {
            categories: ["Fishing", "Agri", "Others"],
            labels: { style: { fontSize: "14px" } },
          },
          xaxis: {
            categories: ["Fishing", "Agri", "Others"],
          },
          tooltip: {
            y: {
              title: {
                formatter: () => "Total:",
              },
            },
          },
        },
      });
    }, 2000);
  }, [fishingCount, agriCount, othersCount, location.pathname]);

  //OTHER INCOME BAR CHART
  useEffect(() => {
    setTimeout(() => {
      setOtherIncomeBarData({
        series: [{ data: incomeCounts }],
        options: {
          chart: {
            type: "bar",
            height: "100%",
            toolbar: { show: false },
            padding: { bottom: 0 },
          },
          plotOptions: {
            bar: { borderRadius: 0, horizontal: true },
          },
          dataLabels: { enabled: true },
          yaxis: {
            categories: incomeTypes,
            labels: { style: { fontSize: "14px" } },
          },
          xaxis: {
            categories: incomeTypes,
          },
          tooltip: {
            y: {
              title: {
                formatter: () => "Total:",
              },
            },
          },
        },
      });
    }, 2000);
  }, [incomeTypes, incomeCounts, location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-5 p-10">
      <div className="w-full h-18 flex  bg-white rounded-lg shadow-sm p-5 items-center justify-between">
        <h1 className="text-2xl font-black text-blue-950">
          Demographic Profile
        </h1>

        <h1 className="text-lg font-black text-gray-700 bg-gray-200 p-2 rounded-lg">
          Total no. of respondents as of {date} ={" "}
          <span className="text-success text-2xl">{totalRes}</span>
        </h1>
      </div>

      <div className="w-full">
        <div className="divider">
          <span className="text-xl font-black text-gray-500">
            Interventions Received
          </span>
        </div>

        <div className="w-full h-36 grid grid-cols-5 gap-5">
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={net} alt="" />
              <p className="font-black text-xl text-blue-950">Capture</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{capture}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={carps} alt="" />
              <p className="font-black text-xl text-blue-950">Aquaculture</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{culture}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={freezer} alt="" />
              <p className="font-black text-xl text-blue-950">Post-harvest</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{post}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={robotic} alt="" />
              <p className="font-black text-xl text-blue-950">Techno-demo</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{techno}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>

          <div className="flex flex-col bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-2">
              <img src={fishing} alt="" />
              <p className="font-black text-xl text-blue-950">Others</p>
            </div>
            {/* <p className="text-sm text-gray-600">Interventions Received</p> */}

            {isVisible ? (
              <div className="flex-1 flex justify-end items-end">
                <h1 className="font-black text-5xl text-gray-700">{other}</h1>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MID ------------------------ */}

      <div className="w-full flex gap-5">
        <div className="flex flex-col gap-5 w-1/2">
          <div className="flex flex-col p-6 rounded-box bg-white shadow-sm">
            <div className="flex gap-2 items-center">
              <img src={calendar} alt="" />
              <p className="font-black text-xl text-blue-950">Age Bracket</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {barData ? (
                <div className="flex-1 p-2">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-5">
            <div className="flex flex-col rounded-box bg-white shadow-sm p-5">
              <div className="flex gap-2 items-center">
                <img src={gender} alt="" />
                <p className="font-black text-xl text-blue-950"> Sex</p>
              </div>

              <div className="flex flex-1 items-center justify-evenly">
                {isVisible ? (
                  <>
                    {/* Your content here, after the delay */}
                    <div className="flex gap-2 items-center flex-col">
                      <MdMale
                        size={52}
                        className="bg-blue-100 rounded-full p-2 text-blue-900"
                      />
                      <div className="data">
                        <p className="text-4xl font-black text-blue-950 text-center">
                          {maleCount}
                        </p>
                        <p className="text-md italic font-semibold text-gray-500">
                          Male
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center flex-col">
                      <MdFemale
                        size={52}
                        className="bg-red-100 rounded-full p-2 text-red-700"
                      />
                      <div className="data">
                        <p className="text-4xl font-black text-red-800 text-center">
                          {femaleCount}
                        </p>
                        <p className="text-md italic font-semibold text-gray-500">
                          Female
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="loading loading-spinner loading-xl"></span>
                )}
              </div>
            </div>

            <div className="flex flex-col rounded-box bg-white shadow-sm p-5">
              <div className="flex gap-2 items-center">
                <img src={status} alt="" />
                <p className="font-black text-xl text-blue-950">Civil Status</p>
              </div>
              {isVisible ? (
                <div className="flex-1 flex gap-5 items-center justify-between mt-2">
                  <>
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-sm text-gray-600">Single</p>
                      <p className="text-sm text-gray-600">Married</p>
                      <p className="text-sm text-gray-600">Widowed</p>
                      <p className="text-sm text-gray-600">Divorced</p>
                      <p className="text-sm text-gray-600">Separated</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <div className="badge badge-soft badge-primary font-black">
                        {civilStatusCounts.Single}
                      </div>
                      <div className="badge badge-soft badge-secondary font-black">
                        {civilStatusCounts.Married}
                      </div>
                      <div className="badge badge-soft badge-accent font-black">
                        {civilStatusCounts.Widowed}
                      </div>
                      <div className="badge badge-soft badge-info font-black">
                        {civilStatusCounts.Divorced}
                      </div>
                      <div className="badge badge-soft badge-success font-black">
                        {civilStatusCounts.Separated}
                      </div>
                    </div>
                  </>
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl block mx-auto"></span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5  w-1/2">
          <div className=" bg-white rounded-box shadow-sm p-6 flex flex-col">
            <div className="flex gap-2 items-center">
              <img src={money} alt="" />
              <p className="font-black text-xl text-blue-950">
                {" "}
                Main Source of Income
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {barData ? (
                <div className="flex-1 h-full">
                  <ReactApexChart
                    key={JSON.stringify(barData)}
                    options={barData.options}
                    series={barData.series}
                    type="bar"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>

          <div className="h-1/2 bg-white rounded-box shadow-sm p-6 flex flex-col">
            <div className="flex gap-2 items-center">
              <img src={coin} alt="" />
              <p className="font-black text-xl text-blue-950">
                Other Source of Income
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {otherIncomeBarData ? (
                <div className="flex-1 h-full">
                  <ReactApexChart
                    key={JSON.stringify(otherIncomeBarData)}
                    options={otherIncomeBarData.options}
                    series={otherIncomeBarData.series}
                    type="bar"
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <span className="loading loading-spinner loading-xl"></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MID ---------------------------- */}

      <div className="w-full flex flex-col rounded-box shadow-sm">
        <div className="card h-full bg-white shadow-sm">
          <div className="card-body">
            <div className="font-black text-xl text-blue-950 flex items-center gap-2">
              <img src={users} alt="" />
              No. of Respondents
            </div>

            <div className="w-full flex gap-10">
              <div className="w-1/2 h-full flex flex-col">
                {/* PROVINCE ----------------------- */}

                <div className="w-full">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="font-black text-lg text-blue-950">
                      Province
                    </h1>
                  </div>
                </div>

                <div className="w-full overflow-y-auto flex justify-between mb-5 gap-1 py-2">
                  <div className="flex flex-col flex-1">
                    <table className="table border-collapse border border-gray-300 w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left w-4">
                            <input
                              type="checkbox"
                              checked={allProvincesSelected}
                              onChange={handleSelectAllProvinces}
                            />
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-left">
                            Province
                          </th>
                          <th className="border border-gray-300 px-4 py-2 text-left">
                            Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {provinces.map((province) => (
                          <tr key={province.code}>
                            <td className="border border-gray-300 px-4 py-2">
                              <input
                                type="checkbox"
                                value={province.name}
                                checked={selectedProvinces.includes(
                                  province.name
                                )}
                                onChange={() =>
                                  handleCheckboxChange(province.name)
                                }
                                className="cursor-pointer"
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {province.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {provinceData[province.name] || 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* MUNICIPALITY ----------------------- */}

                <div className="w-full flex justify-between items-center">
                  <h1 className="font-black text-lg text-blue-950">
                    Municipality
                  </h1>
                </div>

                <div className="w-full h-82 overflow-y-auto flex justify-between gap-1 py-2">
                  <div className="flex flex-col flex-1">
                    {Object.keys(municipalityCounts).length === 0 ? (
                      <p className="text-gray-600">
                        Select at least one province
                      </p>
                    ) : (
                      <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead className="text-gray-500">
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
          
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Municipality
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Count
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {municipalityCounts.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="text-gray-600">
                                Select at least one province
                              </td>
                            </tr>
                          ) : (
                            municipalityCounts.map(
                              ({ municipality, province, count }) => (
                                <tr key={`${province}__${municipality}`}>
                                  <td className="border border-gray-300 px-4 py-2 w-4">
                                    <input
                                      type="checkbox"
                                      value={municipality}
                                      className="cursor-pointer"
                                      checked={selectedMunicipalities.includes(
                                        municipality
                                      )}
                                      onChange={() =>
                                        handleMunicipalityChange(municipality)
                                      }
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex justify-between">
                                      <span>{municipality}</span>
                                      <span className="text-gray-400 text-xs">
                                        {province}
                                      </span>
                                    </div>
                                  </td>

                                  <td className="border border-gray-300 px-4 py-2">
                                    {count}
                                  </td>
                                </tr>
                              )
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-1/2 h-full ">
                <h1 className="font-black text-lg text-blue-950">Barangay</h1>

                <div className="w-full h-82 overflow-y-auto flex justify-between gap-1 py-2">
                  <div className="flex flex-col flex-1">
                    {barangay.length === 0 ? (
                      <p className="text-gray-600">
                        Select at least one municipality
                      </p>
                    ) : (
                      <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead className="text-gray-500">
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Barangay
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Count
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {barangay.map(({ barangay, municipality, count }) => (
                            <tr key={`${municipality}__${barangay}`}>
                              <td className="border border-gray-300 px-4 py-2">
                                <div className="flex justify-between">
                                  <span>{barangay}</span>
                                  <span className="text-gray-400 text-xs">
                                    {municipality}
                                  </span>
                                </div>
                              </td>

                              <td className="border border-gray-300 px-4 py-2">
                                {count}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

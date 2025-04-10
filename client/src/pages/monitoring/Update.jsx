import { useNavigate, useParams } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios"
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const Update = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { id } = useParams();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`https://bfar-server.onrender.com/survey/${id}`)
                setData(res.data)
            }
            catch (err) {
                console.error("Error fetching data:", err);
                setError(true)
            } finally {
                setLoading(false)
            }
        }


        fetchData(id)
    }, [id])


    const [formData, setFormData] = useState({
        form: {
            name: "",
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
            baranggay: "",
            projectReceived: "",
            specProject: "",
            noUnitsReceived: "",
            dateReceived: "",
            mainIncome: "",
            otherIncome: "",
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
            q9_11: "",
            q9_11other: "",
            q9_12: "",
            q9_12Spec: "",
            q9_13: "",
            q9_13other: "",
            q9_14: "",
            q9_14_reason: "",
            impactRating: "",
            q10: "",
            q10Reason: "",
            q10_1: "",
            sustainabilityRating: "",
            q11: "",
            q11_1: "",
            q12: "",
            note: "",
        },
    });

    useEffect(() => {
        // When 'data' changes (i.e., after API call), update the form data
        if (data) {
            setFormData({ form: data });
        }
    }, [data]);




    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://localhost:5000/survey/update/${id}`, formData.form)
            console.log('Response:', res.data);
            navigate("/monitoring/")
        } catch (err) {
            console.error('Error occurred:', err.response ? err.response.data : err.message);
        }

    };


    return (
        <div className="p-10">
            <div className="w-full mx-auto p-5 flex flex-col relative bg-white rounded-md shadow-sm">

                {loading && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span className="loading loading-spinner loading-sm text-green-50"></span>
                            <span className='text-green-50'>Fetching data...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-error">
                            <span className='text-red-50'>Error fetching data</span>
                        </div>
                    </div>
                )}



                <div className="absolute left-5 top-8 flex gap-5 items-center">
                    <MdKeyboardBackspace
                        className="text-2xl cursor-pointer text-red-600"
                        onClick={() => navigate("/monitoring/")}
                    />
                    <p className="text-2xl font-bold">Update Form</p>
                </div>

                <form className="flex flex-col mt-24" onSubmit={handleSubmit}>
                    <h2 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 bg-blue-900 p-2">
                        BENEFICIARY INFORMATION
                    </h2>

                    <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Name</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="name"
                                value={formData.form.name || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col sm:w-[150px]">
                            <p className="text-sm">Civil Status</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="civilStatus"
                                value={formData.form.civilStatus || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col sm:w-[150px]">
                            <p className="text-sm">Sex</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="sex"
                                value={formData.form.sex || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col sm:w-[150px]">
                            <p className="text-sm">Age</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="age"
                                value={formData.form.age || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">No. of Household Members</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="hhMember"
                                value={formData.form.hhMember || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">FishR</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="fishR"
                                value={formData.form.fishR || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">BoatR</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="boatR"
                                value={formData.form.boatR || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Name of Association</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="nameAssoc"
                                value={formData.form.nameAssoc || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm">Total No. of Memebers</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="totalMember"
                                value={formData.form.totalMember || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Province</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="province"
                                value={formData.form.province || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Municipality</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="municipality"
                                value={formData.form.municipality || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Baranggay</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="baranggay"
                                value={formData.form.baranggay || ''} // Added || ''
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Project Received</p>
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 ">
                                <div className="flex gap-2 mt-2 sm:mt-0">
                                    <p>Capture</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Capture"
                                        checked={formData.form.projectReceived === "Capture"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Aquaculture</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Aquaculture"
                                        checked={formData.form.projectReceived === "Aquaculture"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Post-harvest</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Post-harvest"
                                        checked={formData.form.projectReceived === "Post-harvest"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Small-scale</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Small-scale"
                                        checked={formData.form.projectReceived === "Small-scale"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Medium-scale</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Medium-scale"
                                        checked={formData.form.projectReceived === "Medium-scale"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Large-scale</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Large-scale"
                                        checked={formData.form.projectReceived === "Large-scale"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <p>Others</p>
                                    <input
                                        type="radio"
                                        name="projectReceived"
                                        value="Others"
                                        checked={formData.form.projectReceived === "Others"} // ADDED CHECKED
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Specific Project</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="specProject"
                                value={formData.form.specProject || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">No. of Units Received</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="noUnitsReceived"
                                value={formData.form.noUnitsReceived || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Date Received/Implemented</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="dateReceived"
                                value={formData.form.dateReceived && !isNaN(new Date(formData.form.dateReceived)) ? 
                                    format(new Date(formData.form.dateReceived), 'MM/dd/yyyy') : ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 mt-2 sm:mt-0 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Main Source if Income</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="mainIncome"
                                value={formData.form.mainIncome || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <p className="text-sm">Other Source of Income</p>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="otherIncome"
                                value={formData.form.otherIncome || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <p className="text-sm italic ml-2 px-5 mt-2 sm:mt-0">
                        Note: Please provide GPS of beneficiary and/or project implemented
                    </p>

                    {/* EFFICIENCY OF THE PROJECT================================================================= */}
                    <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
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
                                    value="Yes"
                                    checked={formData.form.quantity === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="quantity"
                                    value="No"
                                    checked={formData.form.quantity === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="quantityReason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.quantityReason || ''}
                                onChange={handleChange}
                                required={formData.form.quantity === "No"}
                                disabled={formData.form.quantity === "Yes"}
                            />
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
                                value={formData.form.quantityRating || ''}
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
                                    value="Yes"
                                    checked={formData.form.quality === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="quality"
                                    value="No"
                                    checked={formData.form.quality === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="qualityReason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.qualityReason || ''}
                                onChange={handleChange}
                                required={formData.form.quality === "No"}
                                disabled={formData.form.quality === "Yes"}
                            />
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
                                value={formData.form.qualityRating || ''}
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

                    {/* EFFICIENCY OF THE PROJECT================================================================= */}
                    <h1 className="text-sm font-bold text-white mb-2 mx-5 sm:mx-2 mt-5 bg-blue-950 p-2">
                        TIMELINESS OF THE PROJECT
                    </h1>
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
                                    checked={formData.form.q2 === "Yes"}
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
                                    checked={formData.form.q2 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                type="text"
                                name="q2Reason"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.q2Reason || ''}
                                onChange={handleChange}
                                required={formData.form.q2 === "No"}
                                disabled={formData.form.q2 === "Yes"}
                            />
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
                                value={formData.form.timelinessRating || ''}
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
                                    value="Yes"
                                    checked={formData.form.uponRequest === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="uponRequest"
                                    value="No"
                                    checked={formData.form.uponRequest === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="uponRequest"
                                    value="< 6 Months"
                                    checked={formData.form.uponRequest === "< 6 Months"}
                                    onChange={handleChange}
                                    required
                                />
                                <span>{"<"} 6 months</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="uponRequest"
                                    value="< 1 Year"
                                    checked={formData.form.uponRequest === "< 1 Year"}
                                    onChange={handleChange}
                                    required
                                />
                                <span>{"<"} 1 year</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="uponRequest"
                                    value="> 1 Year"
                                    checked={formData.form.uponRequest === "> 1 Year"}
                                    onChange={handleChange}
                                    required
                                />
                                <span>{">"} 1 year</span>
                            </div>
                        </div>
                    </div>

                    
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
                                    value="Yes"
                                    checked={formData.form.q3 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q3"
                                    value="No"
                                    checked={formData.form.q3 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                type="text"
                                name="q3Reason"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.q3Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q3 == "No" ? true : (formData.form.q3Reason = "")
                                }
                                disabled={formData.form.q3 == "Yes" ? true : false}
                            />
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
                                required
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
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
                                <option value="" selected>
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
                                    value="Yes"
                                    checked={formData.form.q4 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q4"
                                    value="No"
                                    checked={formData.form.q4 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                type="text"
                                name="q4Reason"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.q4Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q4 == "No" ? true : (formData.form.q4Reason = "")
                                }
                                disabled={formData.form.q4 == "Yes" ? true : false}
                            />
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
                                    value="Yes"
                                    checked={formData.form.q5 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q5"
                                    value="No"
                                    checked={formData.form.q5 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="q5Reason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.q5Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q5 == "No" ? true : (formData.form.q5Reason = "")
                                }
                                disabled={formData.form.q5 == "Yes" ? true : false}
                            />
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
                                    checked={formData.form.q6 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q6"
                                    value="No"
                                    checked={formData.form.q6 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="q6Reason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If Yes, pls specify project from other NGA/NGO"
                                value={formData.form.q6Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q6 == "Yes" ? true : (formData.form.q6Reason = "")
                                }
                                disabled={formData.form.q6 == "Yes" ? false : true}
                            />
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
                                    value="Yes"
                                    checked={formData.form.q7Satisfied === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q7Satisfied"
                                    value="No"
                                    checked={formData.form.q7Satisfied === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="q7_1"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, why?"
                                value={formData.form.q7_1}
                                onChange={handleChange}
                                required={
                                    formData.form.q7Satisfied == "No"
                                        ? true
                                        : (formData.form.q7_1 = "")
                                }
                                disabled={formData.form.q7Satisfied == "Yes" ? true : false}
                            />
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
                                    checked={formData.form.q7_2 === "Yes"}
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
                                    checked={formData.form.q7_2 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="q7_2Reason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If No, please specify"
                                value={formData.form.q7_2Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q7_2 == "No"
                                        ? true
                                        : (formData.form.q7_2Reason = "")
                                }
                                disabled={formData.form.q7_2 == "Yes" ? true : false}
                            />
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
                                    checked={formData.form.q8 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q8"
                                    value="No"
                                    checked={formData.form.q8 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                name="q8Reason"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If yes, please specify"
                                value={formData.form.q8Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q8 == "Yes" ? true : (formData.form.q8Reason = "")
                                }
                                disabled={formData.form.q8 == "Yes" ? false : true}
                            />
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
                                    checked={formData.form.q9_1 === "Yes"}
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
                                    checked={formData.form.q9_1 === "No"}
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
                                    checked={formData.form.q9_1 === "N/A"}
                                    onChange={handleChange}
                                    required
                                />
                                N/A
                            </div>
                            <input
                                name="q9_1Spec"
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="Species"
                                value={formData.form.q9_1Spec}
                                onChange={handleChange}
                                required={
                                    formData.form.q9_1 == "Yes"
                                        ? true
                                        : (formData.form.q9_1Spec = "")
                                }
                                disabled={formData.form.q9_1 == "Yes" ? false : true}
                            />
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
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="q9_2"
                                value={formData.form.q9_2}
                                onChange={handleChange}
                                required
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
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="q9_3"
                                value={formData.form.q9_3}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm sm:indent-10">- Contribution to Production</p>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="q9_4"
                                value={formData.form.q9_4}
                                onChange={handleChange}
                                required
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
                                required
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
                                required
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
                                    checked={formData.form.q9_7 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q9_7"
                                    value="No"
                                    checked={formData.form.q9_7 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
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
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="q9_8"
                                value={formData.form.q9_8}
                                onChange={handleChange}
                                required
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
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                name="q9_9"
                                value={formData.form.q9_9}
                                onChange={handleChange}
                                required
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
                                    value="Yes"
                                    checked={formData.form.q9_10 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q9_10"
                                    value="No"
                                    checked={formData.form.q9_10 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                        <div className="flex-1"></div>

                        <div className="flex flex-row flex-1 gap-6">
                            <div className="flex gap-2 text-sm items-center">
                                <input
                                    type="radio"
                                    name="q9_11"
                                    value="Consumption"
                                    checked={formData.form.q9_11 === "Consumption"}
                                    onChange={handleChange}
                                    required
                                />
                                Consumption
                            </div>
                            <div className="flex gap-2 text-sm items-center">
                                <input
                                    type="radio"
                                    name="q9_11"
                                    value="Education"
                                    checked={formData.form.q9_11 === "Education"}
                                    onChange={handleChange}
                                    required
                                />
                                Education
                            </div>
                            <div className="flex gap-2 text-sm items-center">
                                <input
                                    type="radio"
                                    name="q9_11"
                                    value="Other HH needs"
                                    checked={formData.form.q9_11 === "Other HH needs"}
                                    onChange={handleChange}
                                    required
                                />
                                Other HH needs
                            </div>
                        </div>
                    </div>

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
                                    value="Yes"
                                    checked={formData.form.q9_12 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q9_12"
                                    value="No"
                                    checked={formData.form.q9_12 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                        <div className="flex-1"></div>
                        <div className="flex flex-col flex-1 gap-2">
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q9_13"
                                    value="Improved Skills/Knowledge"
                                    checked={formData.form.q9_13 === "Improved Skills/Knowledge"}
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
                                    checked={formData.form.q9_13 === "From Association to Coop"}
                                    onChange={handleChange}
                                    required
                                />
                                From Association to Coop
                            </div>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="Others (please specify)"
                                name="q9_13other"
                                value={formData.form.q9_13other}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

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
                                    value="Yes"
                                    checked={formData.form.q9_14 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q9_14"
                                    value="No"
                                    checked={formData.form.q9_14 === "No"}
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
                                    checked={formData.form.q9_14 === "N/A"}
                                    onChange={handleChange}
                                    required
                                />
                                N/A
                            </div>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="Please specify"
                                name="q9_12Spec"
                                value={formData.form.q9_12Spec}
                                onChange={handleChange}
                                required
                            />
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
                                    value="Yes"
                                    checked={formData.form.q10 === "Yes"}
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
                                    checked={formData.form.q10 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                            <input
                                type="text"
                                className="border-1 border-gray-400 px-3 h-[42px] rounded-md focus:outline-none"
                                placeholder="If no, state reason why not operational/used"
                                name="q10Reason"
                                value={formData.form.q10Reason}
                                onChange={handleChange}
                                required={
                                    formData.form.q10 == "No"
                                        ? true
                                        : (formData.form.q10Reason = "")
                                }
                                disabled={formData.form.q10 == "Yes" ? true : false}
                            />
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
                                    checked={formData.form.q10_1 === "< 3 months"}
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
                                    checked={formData.form.q10_1 === "< 1 year"}
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
                                    checked={formData.form.q10_1 === "> 1 year"}
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
                                    value="Yes"
                                    checked={formData.form.q11 === "Yes"}
                                    onChange={handleChange}
                                    required
                                />
                                Yes
                            </div>
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q11"
                                    value="No"
                                    checked={formData.form.q11 === "No"}
                                    onChange={handleChange}
                                    required
                                />
                                No
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 px-5 sm:flex-row sm:p-2">
                        <div className="flex flex-col flex-1">
                            <p className="text-sm sm:indent-5 flex-1">
                                Please specify
                            </p>
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <div className="flex gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="q11_1"
                                    value="Vending"
                                    checked={formData.form.q11_1 === "Vending"}
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
                                    checked={formData.form.q11_1 === "Local Market"}
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
                                    checked={formData.form.q11_1 === "Trader/Consignee"}
                                    onChange={handleChange}
                                    required={formData.form.q11 == "Yes" ? true : false}
                                />
                                Trader/Consignee
                            </div>
                        </div>
                    </div>
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
                                required
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
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-full text-white"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "Update"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;

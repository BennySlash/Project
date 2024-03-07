import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const History = () => {
  const [displayExam, setDisplayExam] = useState([]);
  const [examLength, setExamLength] = useState();
  const [examPage, setExamPage] = useState();
  const [display, setDisplay] = useState(false);
  const location = useLocation();
  const user = location.state.name;
  const title = "Safeguarding";
  const historyArray = Array.from({ length: examLength }, (_, index) => index);

  const handleClick = () => {
    setDisplay(true);

    setExamPage(
      <div className="flex flex-col items-center justify-center border">
        {historyArray.map((x) => {
          return (
            <div key={x}>
              <div>
                <h2 className="flex gap-x-10 py-2.5 px-5 me-2 mb-2 text-xl font-medium text-gray-900 bg-slate-700 rounded-lg border border-gray-200">
                  <span>{`#${x + 1}`}</span>
                  {displayExam[x].questionsArray[x].question}
                </h2>
              </div>
              <div className="flex flex-col">
                <div className="border px-1">
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      A
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[x].questionsArray[x].optionA}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      B
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[x].questionsArray[x].optionB}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      C
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[x].questionsArray[x].optionC}
                    </h4>
                  </div>
                  <div className="flex gap-x-5 justify-start items-center">
                    <h6 className="rounded-full bg-blue-700 p-2.5 text-white">
                      D
                    </h6>
                    <h4 className="w-full rounded-sm bg-blue-700 p-3 text-sm text-white text-center">
                      {displayExam[x].questionsArray[x].optionD}
                    </h4>
                  </div>
                </div>
                <div className="flex gap-x-5 justify-start items-center">
                  <h6>Answer</h6>

                  <h4 className="rounded-sm bg-green-700 p-3 text-sm text-white text-center">
                    {displayExam[x].questionsArray[x].answer}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const getExam = async () => {
      await axios
        .get("http://localhost:4000/api/get-exams")
        .then((res) => {
          //   console.log(res.data.exam);
          const exams = res.data.exam;
          const exam = exams.find((obj) => obj.title === title);
          //   console.log(exam);
          setDisplayExam((prevState) => {
            return [...prevState, exam];
          });
          setExamLength(exam.questionsArray.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getExam();
  }, [displayExam]);
  return (
    <div className="p-10">
      <button
        onClick={handleClick}
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        getExams
      </button>
      {display && examPage}
    </div>
  );
};

export default History;

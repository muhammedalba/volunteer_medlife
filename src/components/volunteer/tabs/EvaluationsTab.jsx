import React, { useState, useEffect } from "react";
import { getEvaluations } from "@/services/volunteerService";
import EvaluationCard from "../Evaluation/EvaluationCard";
import Preloader from "../../../components/Preloader/Preloader";
import { errorNotify } from "../../../utils/Toast";

const EvaluationsTab = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getEvaluations();
        setEvaluations(data.evaluations || []);
      } catch (err) {
        console.error("Error fetching evaluations:", err);
        setError("فشل في تحميل سجلات التقييم");
        errorNotify("فشل في تحميل سجلات التقييم");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, []);



  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {evaluations.length > 0 ? (
        evaluations.map((evaluation) => (
          <div
            key={evaluation.id}
    
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <EvaluationCard evaluation={evaluation} />
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow">
          <p className="text-gray-500">لا توجد سجلات تقييم</p>
        </div>
      )}
    </div>
  );
};

export default EvaluationsTab;

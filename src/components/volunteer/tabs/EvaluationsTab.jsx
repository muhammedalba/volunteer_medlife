import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvaluations } from "@/services/volunteerService";
import EvaluationCard from "../Evaluation/EvaluationCard";
import Preloader from "../../../components/Preloader/Preloader";
import { errorNotify } from "../../../utils/Toast";

const EvaluationsTab = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleViewDetails = (evaluationId) => {
    navigate(`/volunteer/evaluations/${evaluationId}`);
  };

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
            onClick={() => handleViewDetails(evaluation.id)}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
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

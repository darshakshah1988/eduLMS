import { useCallback } from "react";
import { useEffect, useState } from "react";
import { getCurriculumAction } from "src/actions/courseActions";
import CurriculumSectionComponent from "./Section";

const CurriculumTabContent = ({ courseId }) => {
  const [list, setList] = useState([]);
  const getCurriculum = useCallback(() => {
    getCurriculumAction(courseId)
      .then((response) => {
        if (response.status && Array.isArray(response.data)) {
          setList(response.data);
        } else {
          setList([]);
        }
      })
      .catch(() => {});
  }, [courseId]);

  useEffect(() => {
    getCurriculum();
  }, [courseId, getCurriculum]);

  const addSection = () => {
    setList((items) => [...items, ""]);
  };
  return (
    <div className="content">
      {list.map((section, index) => (
        <CurriculumSectionComponent
          key={`sec-${index}`}
          data={section}
          isNew={!section?.id}
          loadData={getCurriculum}
          order={index}
        />
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addSection()}
      >
        Add Chapter
      </button>
    </div>
  );
};

export default CurriculumTabContent;

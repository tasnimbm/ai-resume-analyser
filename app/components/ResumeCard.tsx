import React from 'react';
import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";



const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    return (
        <Link to={`/resume/${id}/resume-cards`} className="resume-card animate-in fade-in duration-1000">

            {/* Header: job + circle */}
            <div className="resume-card-header flex justify-between items-center mb-4">
                <div className="flex flex-col items-center flex-1">
                    <h2 className="!text-black font-bold break-words">{companyName}</h2>
                    <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
                </div>

                <div className="flex-shrink-0 ml-4">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {/* Image: full width below */}
            <div className="gradient-border animate-in fade-in duration-1000 w-full">
                <img
                    src={imagePath}
                    alt="resume"
                    className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                />
            </div>

        </Link>
    );
};

export default ResumeCard;
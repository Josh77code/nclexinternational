-- Insert new questions for all student grades (starter, mid, higher)
-- These questions will be visible to all students regardless of grade level
-- Questions are from Parenteral Nutrition, IV Therapy, and Blood Transfusion categories

INSERT INTO exam_questions (
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
  explanation,
  category,
  difficulty_level,
  student_grade,
  is_active,
  question_time_limit
) VALUES
-- Parenteral Nutrition Questions
(
  'The nurse is caring for a restless client who is beginning nutritional therapy with parenteral nutrition (PN). The nurse should plan to ensure that which action is taken to prevent the client from sustaining injury?',
  'Calculate daily intake and output.',
  'Monitor the temperature once daily.',
  'Secure all connections in the PN system.',
  'Monitor blood glucose levels every 12 hours.',
  'C',
  'The nurse should plan to secure all connections in the tubing (tape is used per agency protocol). This helps prevent the restless client from pulling the connections apart accidentally.',
  'Parenteral Nutrition',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client receiving parenteral nutrition (PN) complains of a headache. The nurse notes that the client has an increased blood pressure, bounding pulse, jugular vein distention, and crackles bilaterally. The nurse determines that the client is experiencing which complication of PN therapy?',
  'Sepsis',
  'Air embolism',
  'Hypervolemia',
  'Hyperglycemia',
  'C',
  'Hypervolemia is a critical situation and occurs from excessive fluid administration or administration of fluid too rapidly.',
  'Parenteral Nutrition',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
-- IV Therapy Questions
(
  'A client had a 1000-mL bag of 5% dextrose in 0.9% sodium chloride hung at 3 PM. The nurse making rounds at 3:45 PM finds that the client is complaining of a pounding headache and is dyspneic, is experiencing chills, and is apprehensive, with an increased pulse rate. The intravenous (IV) bag has 400 mL remaining. The nurse should take which action first?',
  'Slow the IV infusion.',
  'Sit the client up in bed.',
  'Remove the IV catheter.',
  'Call the health care provider (HCP).',
  'A',
  'The client''s symptoms are compatible with circulatory overload. The first action of the nurse is to slow the infusion.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse has a prescription to hang a 1000-mL intravenous (IV) bag of 5% dextrose in water with 20 mEq of potassium chloride and needs to add the medication to the IV bag. The nurse should plan to take which action immediately after injecting the potassium chloride into the port of the IV bag?',
  'Rotate the bag gently.',
  'Attach the tubing to the client.',
  'Prime the tubing with the IV solution.',
  'Check the solution for yellowish discoloration.',
  'A',
  'After adding a medication to a bag of IV solution, the nurse should agitate or rotate the bag gently to mix the medication evenly in the solution.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse is completing a time tape for a 1000-mL IV bag that is scheduled to infuse over 8 hours. The nurse has just placed the 11:00 AM marking at the 500-mL level. The nurse would place the mark for noon at which numerical level (mL) on the time tape?',
  '250 mL',
  '375 mL',
  '625 mL',
  '750 mL',
  'B',
  'If the IV is scheduled to run over 8 hours, then the hourly rate is 125 mL/hour. The next hourly marking would be at 375 mL.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse is making initial rounds on the nursing unit to assess the condition of assigned clients. The nurse notes that a client''s intravenous (IV) site is cool, pale, and swollen, and the solution is not infusing. The nurse concludes that which complication has occurred?',
  'Infection',
  'Phlebitis',
  'Infiltration',
  'Thrombosis',
  'C',
  'An infiltrated IV is one that has dislodged from the vein and is lying in subcutaneous tissue. Pallor, coolness, and swelling are the results of IV fluid being deposited in the subcutaneous tissue.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse is inserting an intravenous line into a client''s vein. After the initial stick, the nurse would continue to advance the catheter in which situation?',
  'The catheter advances easily.',
  'The vein is distended under the needle.',
  'The client does not complain of discomfort.',
  'Blood return shows in the back flash chamber of the catheter.',
  'D',
  'The IV catheter has entered the lumen of the vein successfully when blood back flash shows in the IV catheter.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse notes that the site of a client''s peripheral intravenous (IV) catheter is reddened, warm, painful, and slightly edematous proximal to the insertion point of the IV catheter. After taking appropriate steps to care for the client, the nurse should document in the medical record that the client experienced which condition?',
  'Phlebitis of the vein',
  'Infiltration of the IV line',
  'Hypersensitivity to the IV solution',
  'Allergic reaction to the IV catheter material',
  'A',
  'Phlebitis at an IV site can be distinguished by client discomfort at the site and by redness, warmth, and swelling proximal to the catheter.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse is preparing a continuous intravenous (IV) infusion at the medication cart. As the nurse goes to insert the spike end of the IV tubing into the IV bag, the tubing drops and the spike end hits the top of the medication cart. The nurse should take which action?',
  'Obtain a new IV bag.',
  'Obtain new IV tubing.',
  'Wipe the spike end of the tubing with Betadine.',
  'Scrub the spike end of the tubing with an alcohol swab.',
  'B',
  'The nurse should obtain new IV tubing because contamination has occurred and could cause systemic infection to the client.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A health care provider has written a prescription to discontinue an intravenous (IV) line. The nurse should obtain which item from the unit supply area for applying pressure to the site after removing the IV catheter?',
  'Elastic wrap',
  'Betadine swab',
  'Adhesive bandage',
  'Sterile 2 × 2 gauze',
  'D',
  'A dry sterile dressing such as a sterile 2 × 2 is used to apply pressure to the discontinued IV site.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client rings the call bell and complains of pain at the site of an intravenous (IV) infusion. The nurse assesses the site and determines that phlebitis has developed. The nurse should take which priority action in the care of this client?',
  'Notify the health care provider (HCP).',
  'Remove the IV catheter at that site.',
  'Apply warm moist packs to the site.',
  'Start a new IV line in a proximal portion of the same vein.',
  'B',
  'The nurse should remove the IV at the phlebitis site (priority action), then apply warm moist compresses, notify the HCP, and document the occurrence. Note: Multiple actions are required, but removing the IV catheter is the priority.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client involved in a motor vehicle crash presents to the emergency department with severe internal bleeding. The client is severely hypotensive and unresponsive. The nurse anticipates that which intravenous (IV) solution will most likely be prescribed to increase intravascular volume, replace immediate blood loss volume, and increase blood pressure?',
  '5% dextrose in lactated Ringer''s',
  '0.33% sodium chloride (⅓ normal saline)',
  '0.225% sodium chloride (¼ normal saline)',
  '0.45% sodium chloride (½ normal saline)',
  'A',
  'The 5% dextrose in lactated Ringer''s (hypertonic solution) would increase intravascular volume and immediately replace lost fluid volume.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse provides a list of instructions to a client being discharged to home with a peripherally inserted central catheter (PICC). The nurse determines that the client needs further instructions if the client made which statement?',
  '"I need to wear a Medic-Alert tag or bracelet."',
  '"I need to restrict my activity while this catheter is in place."',
  '"I need to have a repair kit available in the home for use if needed."',
  '"I need to keep the insertion site protected when in the shower or bath."',
  'B',
  'Only minor activity restrictions apply with a PICC line.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client has just undergone insertion of a central venous catheter at the bedside. The nurse would be sure to check which results before initiating the flow rate of the client''s intravenous (IV) solution at 100 mL/hour?',
  'Serum osmolality',
  'Serum electrolyte levels',
  'Portable chest x-ray film',
  'Intake and output record',
  'C',
  'Before beginning administration of IV solution, the nurse should assess whether the chest radiograph reveals that the central catheter is in the proper place.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client with the recent diagnosis of myocardial infarction and impaired renal function is recuperating on the step-down cardiac unit. The client''s blood pressure has been borderline low and intravenous (IV) fluids have been infusing at 100 mL/hour via a central line catheter in the right internal jugular for approximately 24 hours. Upon entering the client''s room, the nurse notes that the client is breathing rapidly and is coughing. The nurse determines that the client is most likely experiencing which complication of IV therapy?',
  'Hematoma',
  'Air embolism',
  'Systemic infection',
  'Circulatory overload',
  'D',
  'Circulatory (fluid) overload is a complication of intravenous therapy. Signs include rapid breathing, dyspnea, a moist cough, and crackles.',
  'IV Therapy',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
-- Blood Transfusion Questions
(
  'Packed red blood cells have been prescribed for a client with low hemoglobin and hematocrit levels. The nurse takes the client''s temperature before hanging the blood transfusion and records 100.6 °F orally. Which action should the nurse take?',
  'Begin the transfusion as prescribed.',
  'Administer an antihistamine and begin the transfusion.',
  'Delay hanging the blood and notify the health care provider (HCP).',
  'Administer two tablets of acetaminophen (Tylenol) and begin the transfusion.',
  'C',
  'If the client has a temperature higher than 100 °F, the unit of blood should not be hung until the HCP is notified.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse has received a prescription to transfuse a client with a unit of packed red blood cells. Before explaining the procedure to the client, the nurse should ask which initial question?',
  '"Have you ever had a transfusion before?"',
  '"Why do you think that you need the transfusion?"',
  '"Have you ever gone into shock for any reason in the past?"',
  '"Do you know the complications and risks of a transfusion?"',
  'A',
  'Asking the client about personal experience with transfusion therapy provides a good starting point for client teaching.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client receiving a transfusion of packed red blood cells (PRBCs) begins to vomit. The client''s blood pressure is 90/50 mm Hg from a baseline of 125/78 mm Hg. The client''s temperature is 100.8 °F orally from a baseline of 99.2 °F orally. The nurse determines that the client may be experiencing which complication of a blood transfusion?',
  'Septicemia',
  'Hyperkalemia',
  'Circulatory overload',
  'Delayed transfusion reaction',
  'A',
  'Septicemia occurs with the transfusion of blood contaminated with microorganisms. Signs include chills, fever, vomiting, diarrhea, hypotension, and shock.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse determines that a client is having a transfusion reaction. After the nurse stops the transfusion, which action should be taken next?',
  'Remove the intravenous (IV) line.',
  'Run a solution of 5% dextrose in water.',
  'Run normal saline at a keep-vein-open rate.',
  'Obtain a culture of the tip of the catheter device removed from the client.',
  'C',
  'The nurse stops the transfusion and infuses normal saline at a keep-vein-open rate pending further prescriptions.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse has just received a unit of packed red blood cells from the blood bank for transfusion to an assigned client. The nurse is careful to select tubing especially made for blood products, knowing that this tubing is manufactured with which item?',
  'An air vent',
  'Tinted tubing',
  'An in-line filter',
  'A micro drip chamber',
  'C',
  'The tubing used for blood administration has an in-line filter.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client has received a transfusion of platelets. The nurse evaluates that the client is benefiting most from this therapy if the client exhibits which finding?',
  'Increased hematocrit level',
  'Increased hemoglobin level',
  'Decline of elevated temperature to normal',
  'Decreased oozing of blood from puncture sites and gums',
  'D',
  'Platelets are necessary for proper blood clotting. The client with insufficient platelets may exhibit frank bleeding or oozing of blood.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse has just obtained a unit of blood from the blood bank and has checked the blood bag properly with another nurse. Just before beginning the transfusion, the nurse should assess which priority item?',
  'Vital signs',
  'Skin color',
  'Urine output',
  'Latest hematocrit level',
  'A',
  'A change in vital signs during the transfusion from baseline may indicate that a transfusion reaction is occurring.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse has just received a prescription to transfuse a unit of packed red blood cells for an assigned client. Approximately how long will the nurse need to stay with the client to ensure that a transfusion reaction is not occurring?',
  '5 minutes',
  '15 minutes',
  '30 minutes',
  '45 minutes',
  'B',
  'The nurse must remain with the client for the first 15 minutes of a transfusion.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'Following infusion of a unit of packed red blood cells, the client has developed new onset of tachycardia, bounding pulses, crackles, and wheezes. Which action should the nurse implement first?',
  'Maintain bed rest with legs elevated.',
  'Place the client in high-Fowler''s position.',
  'Increase the rate of infusion of intravenous fluids.',
  'Consult with the health care provider (HCP) regarding initiation of oxygen therapy.',
  'B',
  'Placing the client in a high-Fowler''s (upright) position will facilitate breathing in fluid overload.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse, listening to the morning report, learns that an assigned client received a unit of granulocytes the previous evening. The nurse makes a note to assess the results of which daily serum laboratory studies to assess the effectiveness of the transfusion?',
  'Hematocrit level',
  'Erythrocyte count',
  'Hemoglobin level',
  'White blood cell count',
  'D',
  'The client who has neutropenia may receive a transfusion of granulocytes (white blood cells). Follow-up white blood cell counts evaluate effectiveness.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client is brought to the emergency department having experienced blood loss related to an arterial laceration. Fresh-frozen plasma is prescribed and transfused to replace fluid and blood loss. The nurse understands that which is the rationale for transfusing fresh-frozen plasma to this client?',
  'To treat the loss of platelets',
  'To promote rapid volume expansion',
  'Because a transfusion must be done slowly',
  'Because it will increase the hemoglobin and hematocrit levels',
  'B',
  'Fresh-frozen plasma is often used for volume expansion as a result of fluid and blood loss.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'The nurse who is about to begin a blood transfusion knows that blood cells start to deteriorate after a certain period of time. Which item is important to check regarding the age of blood cells before the transfusion is begun?',
  'Expiration date',
  'Presence of clots',
  'Blood group and type',
  'Blood identification number',
  'A',
  'The nurse notes the expiration date on the unit of blood to ensure that the blood is fresh.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client requiring surgery is anxious about the possible need for a blood transfusion during or after the procedure. The nurse suggests to the client to take which action to reduce the risk of possible transfusion complications?',
  'Ask a family member to donate blood ahead of time.',
  'Give an autologous blood donation before the surgery.',
  'Take iron supplements before surgery to boost hemoglobin levels.',
  'Request that any donated blood be screened twice by the blood bank.',
  'B',
  'Autologous donation and directed family donation reduce the risk of transfusion complications. Autologous donation (donating one''s own blood) is the most effective method to reduce transfusion risks. Note: Both autologous and directed family donations are recommended.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client with severe blood loss resulting from multiple trauma requires rapid transfusion of several units of blood. The nurse asks another health team member to obtain which device for use during the transfusion procedure to help reduce the risk of cardiac dysrhythmias?',
  'Infusion pump',
  'Pulse oximeter',
  'Cardiac monitor',
  'Blood-warming device',
  'D',
  'Rapid transfusion of cool blood places the client at risk for cardiac dysrhythmias. A blood warmer should be used.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
),
(
  'A client has a prescription to receive a unit of packed red blood cells. The nurse should obtain which intravenous (IV) solution from the IV storage area to hang with the blood product at the client''s bedside?',
  'Lactated Ringer''s',
  '0.9% sodium chloride',
  '5% dextrose in 0.9% sodium chloride',
  '5% dextrose in 0.45% sodium chloride',
  'B',
  'Sodium chloride 0.9% (normal saline) is the solution used to precede and follow infusion of blood products.',
  'Blood Transfusion',
  'medium',
  NULL, -- Visible to all grades
  true,
  60
);

-- Verify the insertions
SELECT 
  COUNT(*) as total_questions,
  category,
  difficulty_level,
  student_grade
FROM exam_questions
WHERE category IN ('Parenteral Nutrition', 'IV Therapy', 'Blood Transfusion')
  AND explanation IS NOT NULL
GROUP BY category, difficulty_level, student_grade
ORDER BY category, difficulty_level;


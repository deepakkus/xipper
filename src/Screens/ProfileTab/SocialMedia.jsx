// import React, { useRef } from "react";
// // import { MdCancel } from "react-icons/md";
// // import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { useState } from "react";
// // import { IoMdCloseCircle } from "react-icons/io";
// // import { MdEdit } from "react-icons/md";
// import {LinkedinIcon} from "../../assets/images/Icons/SocialMediaIcons";
// import {YoutubeIcon} from "../../assets/images/Icons/SocialMediaIcons";
// import {FacebookIcon} from "../../assets/images/Icons/SocialMediaIcons";
// import {SnapIcon} from "../../assets/images/Icons/SocialMediaIcons";
// import {InstagramIcon} from "../../assets/images/Icons/SocialMediaIcons";

// // import linkedin_logo from "../../assets/linkedin_logo.png";
// // import instagram_logo from "../../assets/instagram_logo.webp";
// // import youtube_logo from "../../assets/youtube_logo.png";
// // import { MdKeyboardArrowDown } from "react-icons/md";

// const SocialMedia = ({ social }) => {
//   const [showOption, setShowOptions] = useState(false);
//   const [expandId, setExpandId] = useState(false);

//   const expandingId = () => {
//     setExpandId(!expandId);
//   };

//   return (
//     <div className="w-64 sm:w-96">
//       <div
//         onClick={expandingId}
//         className="rounded-lg px-5 flex justify-between items-center  text-white cursor-pointer relative bg-white border"
//       >
//         {social.Type === "LinkedIn" ? (
//           <img
//             src={LinkedinIcon}
//             alt="linkedin"
//             className="h-16 rounded-full mr-2"
//           />
//         ) : null}
//         {social.Type === "Youtube" ? (
//           <img
//             src={YoutubeIcon}
//             alt="linkedin"
//             className="h-16 rounded-full mr-2"
//           />
//         ) : null}
//         {social.Type === "Facebook" ? (
//           <p className="text-blue-600 font-semibold flex items-center text-2xl gap-1">
//             <img
//               src={FacebookIcon}
//               alt="linkedin"
//               className="h-16 py-4 rounded-full mr-2"
//             />{" "}
//             facebook
//           </p>
//         ) : null}
//         {social.Type === "Snapchat" ? (
//           <p className="font-semibold flex items-center text-black text-2xl gap-1">
//             <img
//               src={SnapIcon}
//               alt="linkedin"
//               className="h-16 py-4 rounded-full mr-2"
//             />{" "}
//             Snapchat
//           </p>
//         ) : null}
//         {social.Type === "Instagram" ? (
//           <img
//             src={InstagramIcon}
//             alt="linkedin"
//             className="h-16 mr-2"
//           />
//         ) : null}
//         {/* <MdKeyboardArrowDown color="gray" size={25} /> */}
//       </div>
//       <div
//       style={{transition: 'all 0.5s ease-in-out'}}
//         className={`px-5 text-black ${
//           expandId
//             ? "h-fit pb-4 mt-4 rounded-2xl shadow-sm"
//             : "h-0 overflow-hidden bg-none"
//         }`}
//       >
//         {social.profiles.map((profile, index) => {
//           return (
//             <div key={index} className={ `${profile==="#link" ? "bg-[#6D38C3] text-white" : "bg-white"} mt-1 border flex items-center py-3 w-full px-2 rounded-2xl`}>
               
//               {social.Type === "LinkedIn" ? (
//                 <img
//                   src={linkedin_logo}
//                   alt="linkedin"
//                   className="h-10 rounded-full mr-2"
//                 />
//               ) : null}
//               {social.Type === "Youtube" ? (
//                 <img
//                   src={youtube_logo}
//                   alt="linkedin"
//                   className="h-10 rounded-full mr-2"
//                 />
//               ) : null}
//               {social.Type === "Facebook" ? (
//                 <img
//                   src={facebook}
//                   alt="linkedin"
//                   className="h-10 py-2 rounded-full mr-2"
//                 />
//               ) : null}
//               {social.Type === "Snapchat" ? (
//                 <img
//                   src={snapchat}
//                   alt="linkedin"
//                   className="h-10 py-2 ml-2 mr-2"
//                 />
//               ) : null}
//               {social.Type === "Instagram" ? (
//                 <img
//                   src={instagram_logo}
//                   alt="linkedin"
//                   className="h-8 mr-2"
//                 />
//               ) : null}
//               <p>{profile==="#link" ? `Link your ${social.Type} account` : profile}</p>
              
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SocialMedia;

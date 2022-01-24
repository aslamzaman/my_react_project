import React from "react";
import { Routes, Route } from "react-router-dom";

import BayprostabPage from "../pages/bayprostab/BayprostabPage"
import Code from "../pages/code/CodeIndex";
import ConverterPage from "../pages/converter/ConverterPage";
import DocumentPage from "../pages/document/DocumentPage";
import DocumentViewPage from "../pages/document/DocumentViewPage";
import HomeIndex from "../pages/home/HomeIndex";

import HondaPage from "../pages/honda/HondaPage";
import HondaDetailPage from "../pages/honda/Honda_detailPage";
import HondapicPage from "../pages/honda/HondapicPage";

import LandPage from "../pages/land/LandPage";
import LandabsPage from "../pages/land/LandabsPage";

import Octen from "../pages/octen/OctenIndex";
import Post from "../pages/post/PostPage";
import ProjectPage from "../pages/project/ProjectPage";

import StaffPage from "../pages/staff/StaffPage";
import StaffDocPage from "../pages/staff/StaffdocPage";
import StaffdetailPage from "../pages/staff/StaffdetailPage";


import UnitPage from "../pages/unit/UnitPage";

// Construction Works
import BrickFlatSolling from "../pages/construction/BrickFlatSolling";
import BrickWork from "../pages/construction/BrickWork";
import CcWork from "../pages/construction/CcWork";
import PlasterWork from "../pages/construction/PlasterWorks";
import RccWork from "../pages/construction/RccWork";


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/bayprostab" element={<BayprostabPage />} />
      <Route path="/code" element={<Code />} />
      <Route path="/converter" element={<ConverterPage />} />

      <Route path="/document" element={<DocumentPage />} />
      <Route path="/document/list/:id" element={<DocumentViewPage />} />
      
      <Route path="/" element={<HomeIndex />} />

      <Route path="/honda" element={<HondaPage />} />
      <Route path="/honda/detail/:id2" element={<HondaDetailPage />} />
      <Route path="/honda/pic/:id2/:id3" element={<HondapicPage />} />

      <Route path="/land" element={<LandPage />} />
      <Route path="/land/list/:unitId" element={<LandabsPage />} />

      <Route path="/octen" element={<Octen />} />
      <Route path="/post" element={<Post />} />
      <Route path="/project" element={<ProjectPage />} />

      <Route path="/staff" element={<StaffPage />} />
      <Route path="/staff/doc/:id2" element={<StaffDocPage />} />
      <Route path="/staff/detail/:id2" element= {<StaffdetailPage />} />

      <Route path="/unit" element={<UnitPage />} />

      {/* Construction Works */}
      <Route path="/bfs" element={<BrickFlatSolling />} />
      <Route path="/bw" element={<BrickWork />} />
      <Route path="/ccw" element={<CcWork />} />
      <Route path="/pw" element={<PlasterWork />} />
      <Route path="/rccw" element={<RccWork />} />

    </Routes>
  );
}

export default RoutesComponent;





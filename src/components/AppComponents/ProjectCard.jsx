import PropTypes from "prop-types";
import { Box, CardContent, Typography } from "@mui/material"
import { Divider, Tooltip } from '@mui/material';
import Fade from '@mui/material/Fade';
import Stack from "@mui/material/Stack"
import { FaReact } from "react-icons/fa6";
import { DiJavascript } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { SiApollographql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";


import ProjectButton from "../AppComponents/ProjectButton"
import { useTheme } from '../../contexts/ThemeContext';
import { darkTheme, lightTheme } from "../../Theme.jsx";

import "./styles/projectCard.css"

const baseURL = import.meta.env.BASE_URL;
const isExternalLink = (url) => url.startsWith('http');

function ProjectCard({ project, imageSize }) {
  const { isDarkMode } = useTheme();

  const mapIcon = (TechName) => {
    switch (TechName) {
      case "React":
        return <FaReact />;
      case "Javascript":
        return <DiJavascript />;
      case "NodeJS":
        return <FaNodeJs />;
      case "Express":
        return <SiExpress />;
      case "GraphQL":
        return <GrGraphQl />;
      case "Apollographql":
        return <SiApollographql />;
      case "MongoDB":
        return <SiMongodb />;
    }
  }

  const toolTipProps = {
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -15],
          },
        },
      ],
    },
  }

  return (
        <Box
          key={project.id}
          className="flip-card"
          style={{ width: imageSize(), height: imageSize() }}
        >
          <Box className="flip-card-inner">
            <Box className="flip-card-front">
              <img
                className="flip-card-img"
                src={isExternalLink(project.images[0].src) ? project.images[0].src : `${baseURL}${project.images[0].src}`}
                srcSet={project.images.map((image) => {
                  const imagePath = isExternalLink(image.src) ? image.src : `${baseURL}${image.src}`;
                  return `${imagePath} ${image.width}w`;
                }).join(", ")}
                sizes="(max-width: 600px) 400px, (min-width: 600px) 100vw"
                alt={project.projectName}
              />
            </Box>
            <Box 
              className="flip-card-back"
              spacing={2}
              sx={{backgroundColor: isDarkMode ? darkTheme.palette.accents.main : lightTheme.palette.accents.main }}
            >
              <CardContent className="detailsCardContent">
                <Typography variant="h5">
                  {project.projectName}
                </Typography>
                <Typography variant="body1" className="detailsDecription">
                  {project.description}
                </Typography>
              </CardContent>
              <Divider className="detailsDivider" aria-hidden="true" variant="middle" />
              <CardContent className="detailsTechIcons">
                <Stack display="flex" direction="row" justifyContent="center" flexWrap="wrap" spacing={2}>
                  {project.technologies.map((tech) => (
                    <Tooltip key={tech.id} title={tech.TechName} slotProps={toolTipProps} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                      <Typography sx={{ fontSize:{ xs: "18px", sm: "24px", md: "28px"}}}>{mapIcon(tech.TechName)}</Typography>
                    </Tooltip>
                  ))}
                </Stack>
              </CardContent>
              <CardContent className="detailsButtons">
                <Stack display="flex" direction="row" justifyContent="center" spacing={2}>
                  <ProjectButton text="View Live" href={project.deployedLink}/>
                  <ProjectButton text="View Github" href={project.github}/>
                </Stack>
              </CardContent>
            </Box>
          </Box>
        </Box>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      })
    ).isRequired,
    projectName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        TechName: PropTypes.string.isRequired,
      })
    ).isRequired,
    deployedLink: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
  }).isRequired,
  imageSize: PropTypes.func.isRequired,
};

export default ProjectCard;
import React, { useState, useEffect, useRef } from "react";
import userIcon from "./Group 1.png";
import searchIcon from "./search.png";
import settingsIcon from "./settings.png";
const Carousel = () => {
  const [container, setContainer] = useState(null); //data fetched
  const [containerIndex, setContainerIndex] = useState(0); //indexes of call of duty , gta, assasins creed- index of container
  const [franchiseName, setFranchiseName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [coverImageIndex, setCoverImageIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [titleIcon, setTitleIcon] = useState(0);
  const ref = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") {
      console.log(container);
      setCoverImageIndex((prevIndex) => prevIndex + 1);

      // ref.current.blur();
    } else if (e.key === "ArrowLeft") {
      setCoverImageIndex((prevIndex) => prevIndex - 1);
      // ref.current.blur();
    }
    if (e.key === "ArrowDown") {
      ref.current.focus();
    }
  };

  useEffect(() => {
    console.log("use effect invoked");
    console.log(container);

    const fetchData = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/31709b10-7d7a-448f-8d52-103cfaca1875"
      );
      const data = await response.json();
      console.log(data);

      setContainer(data.games);

      if (containerIndex < data.games.length) {
        setFranchiseName(data.games[containerIndex].franchisee);
        console.log(data.games.length);

        if (coverImageIndex < 0) {
          console.log("entered");
          if (containerIndex > 0) {
            setContainerIndex((prev) => prev - 1);
          } else {
            setContainerIndex(data.games.length - 1);
          }
          setCoverImageIndex(data.games[containerIndex].titles.length - 1);
        } else if (coverImageIndex < data.games[containerIndex].titles.length) {
          setCoverImage(
            data.games[containerIndex].titles[coverImageIndex].cover_image
          );
          setTitle(data.games[containerIndex].titles[coverImageIndex].title);
          setTitleIcon(
            data.games[containerIndex].titles[coverImageIndex].title_icon
          );
        } else {
          setCoverImageIndex(0);
          setContainerIndex((prev) => prev + 1);
        }
      } else if (containerIndex < 0) {
        setContainerIndex(data.games.length - 1);
      } else {
        setContainerIndex(0);
        setContainer(null);
      }
    };

    fetchData();
    console.log(container);
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [coverImageIndex, containerIndex]);

  return (
    
      
<div   className="coverStyle"style={{
    // backgroundImage: `url(${coverImage})`,
    backgroundImage: `linear-gradient(rgba(118, 128, 128, 0.7) 0%, rgba(118, 128, 128, 0) 50%,rgba(128, 128, 128, 0.5) 100% )
    ,url(${coverImage})`,

    
    
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundAttachment:'fixed',
    width: "100%",
    height: "100vh",
    display:"flex",
    flexDirection:"row"

    
}}

>
     
      <div>
      {container && containerIndex < container.length ? (
        <div
          className="CarouselImage"
          // style={{
          //   backgroundImage: `url(${coverImage})`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          //   backgroundPosition: "center",
          //   width: "100%",
          //   height: "100vh",
          // }}
        >
          {/* <h1>Name of the Franchise : {franchiseName}</h1> */}
          <div className="franchise">
          {container.map((item,index)=>{
            return(<a href="#" key={index+1}>{item.franchisee}</a>)
          })}
          </div>
           <div className="backgroundImage">
              {container[containerIndex].titles.map((item, index) => {
                const isActiveImage = index === coverImageIndex;
                return (
                  <img
                    key={index + 1}
                    src={item.background_image}
                    alt={title}
                    className={isActiveImage ? "active-image" : "inactive-image"}
                  />
                );
              })}
            </div>
          <h3 style={{  marginLeft: "113px" , color:"white"}}>{title}</h3>
          <div style={{  }} className="titleIcon">
            <img src={titleIcon} alt="title_icon" />
          </div>
          <div className="btn-div">
            <button  className="button" style={{height:"61px",width:"249px" , marginLeft:"113px" , backgroundColor:"#8000FF",border:"none", color:"white",fontWeight:"700"}}ref={ref}>Buy now</button>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}

      </div>
      <div style={{
        display:"flex",
        flexDirection:"row",
        alignItems:"start",
        marginLeft:"1000px",
        gap:"40px",
        justifyContent:"center",
        marginTop:"50px"

      
        
        
      }}>
        <img src={searchIcon}/>
        <img src={settingsIcon}/>
        <img src={userIcon}/>
        <p style={{color:'white',fontWeight:"700",margin:"0"}}>07:37 Pm</p>
      
     
      </div>
      </div>

    
    
  )}

export default Carousel;
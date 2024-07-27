import React, { useEffect, useState } from "react";

const TitleShow = () => {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=548384f578c74ed79e5a4774f9d9d893");
        const data = await res.json();
        console.log(data.articles);
        setData(data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleShow = (index) => {
    setOpenId(index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.head}>Accordion News</h1>
      {data.map((item, index) => (
        <div
          key={index}
          style={openId === index ? { ...styles.card, ...styles.cardHover } : styles.card}
        >
          <h1
            onClick={() => handleShow(index)}
            style={openId === index ? { ...styles.title, ...styles.titleHover } : styles.title}
          >
            {`${openId === index ? '- ' : '+ '}${item.title}`}
          </h1>
          <h3 style={styles.author}>{item.author}</h3>
          {openId === index && (
            <div>
              <p style={styles.body}>
                {item.description}
              </p>
              {item.urlToImage && <img src={item.urlToImage} alt="" style={styles.image} />}
              <p><strong>Content: {item.content}</strong></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TitleShow;


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9", 
    minHeight: "100vh", 
  },
  card: {
    width: "80%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "15px 0",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff", 
    transition: "transform 0.2s ease-in-out", 
  },
  cardHover: {
    transform: "scale(1.02)", 
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#333",
    marginBottom: "10px",
    transition: "color 0.3s ease-in-out",
  },
  titleHover: {
    color: "#007bff", 
  },
  author: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#000",
    marginBottom: "10px",
  },
  body: {
    fontSize: "16px",
    color: "#444",
    marginTop: "10px",
    lineHeight: "1.6", 
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    marginTop: "10px",
  },
};

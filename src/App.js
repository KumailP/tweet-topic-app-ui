import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [pred, setPred] = useState({
    SVM: "",
    NB: "",
    LR: "",
    MV: ""
  });
  const [fetched, setFetched] = useState(false);

  const predict = () => {
    setLoading(true);
    setFetched(false);
    axios
      .post("http://ec2-54-209-150-58.compute-1.amazonaws.com:4000/api", {
        tweet
      })
      .then(response => {
        setPredictions(JSON.parse(response.data));
      })
      .catch(error => {
        console.log(error);
        setFetched(false);
        setLoading(false);
      });
  };

  const categories = {
    EN: "Entertainment",
    ST: "Science & Technology",
    BN: "Business",
    PT: "Politics",
    HT: "Health",
    ED: "Education",
    SP: "Sports",
    SI: "Social Issues",
    RI: "Religion",
    GM: "General Admin & Management",
    NW: "News",
    WB: "Well Being"
  };

  const setPredictions = pred => {
    const predictions = {
      SVM: categories[pred.svm],
      NB: categories[pred.naive_bayes],
      LR: categories[pred.linear_model],
      MV: categories[pred.majorityVotingResult]
    };
    setPred(predictions);
    setLoading(false);
    setFetched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="tweet">
          <div className="tweet-main">
            <h1>Tweet Topic Prediction</h1>

            <div className="tweet-container">
              <textarea
                placeholder="Enter tweet..."
                name="tweet"
                rows="2"
                onChange={e => setTweet(e.target.value)}
                value={tweet}
                className="tweet-input"
              />
              <button type="button" onClick={predict} className="btn">
                Predict
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loader" />
          ) : fetched ? (
            <>
              <h2>Predictions</h2>
              <div className="tweet-results">
                <div className="result-box model-SVM">
                  <span>
                    <h2>Support Vector Classifier</h2>
                  </span>
                  <span>
                    <p>{pred.SVM}</p>
                  </span>
                </div>
                <div className="result-box model-LG">
                  <span>
                    <h2>Logistic Regression</h2>
                  </span>
                  <span>
                    <p>{pred.LR}</p>
                  </span>
                </div>
                <div className="result-box model-NB">
                  <span>
                    <h2>Naive Bayes Classifier</h2>
                  </span>
                  <span>
                    <p>{pred.NB}</p>
                  </span>
                </div>
                
                <div className="result-box model-NB">
                  <span>
                    <h2>Majority Voting Classifier</h2>
                  </span>
                  <span>
                    <p>{pred.MV}</p>
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;

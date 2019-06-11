import React, { useState } from "react";
import "./App.css";

function App() {
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);

  const predict = () => {
    setLoading(!loading);
    console.log("Hitting API with: ", tweet);
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
            <div class="loader" />
          ) : (
            <>
              <h2>Predictions</h2>
              <div className="tweet-results">
                <div className="result-box model-SVM">
                  <span>
                    <h2>Support Vector Classifier</h2>
                  </span>
                  <span>
                    <p>Science and Technology</p>
                  </span>
                </div>
                <div className="result-box model-LG">
                  <span>
                    <h2>Logistic Regression</h2>
                  </span>
                  <span>
                    <p>Science and Technology</p>
                  </span>
                </div>
                <div className="result-box model-NB">
                  <span>
                    <h2>Naive Bayes Classifier</h2>
                  </span>
                  <span>
                    <p>Science and Technology</p>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

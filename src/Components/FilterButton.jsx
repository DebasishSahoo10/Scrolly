/* eslint-disable react/prop-types */
import ButtonStyles from "./FilterButton.module.css"

export const FilterButton = ({ sortState, sortFunc }) => {
  return (
    <div className={ButtonStyles.buttoncontainer}>
      <button
        value={"Trending"}
        style={{ color: sortState === "Trending" && "#A5A735" }}
        onClick={(e) => sortFunc(e.target.value)}
      >
        Trending
      </button>

      <button
        value={"Newest"}
        style={{ color: sortState === "Newest" && "#A5A735" }}
        onClick={(e) => sortFunc(e.target.value)}
      >
        Newest
      </button>
    </div>
  );
};

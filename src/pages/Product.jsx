import { useState, useRef, useEffect } from "react";
import { categories, colorPallets, sizes_data } from "../data/category";
import { FaSquare } from "react-icons/fa";
import JoditEditor from "jodit-react";

const Product = () => {
  const editor = useRef(null);

  //states
  const [form, setForm] = useState({
    brand: "",
    title: "",
    category: "",
    mrp: "",
    price: "",
    action: "",
  });
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureItems, setFeatureItems] = useState({
    key: "",
    value: "",
  });
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePrev, setImagePrev] = useState([]);

  console.log(color);

  //functions
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePrev((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // const handleRemoveImage = (e) => {
  //   setImagePrev(() => images.filter((i) => i !== images[e]));
  //   setImages(() => images.filter((i) => i !== images[e]));
  // };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeFeatureItem = (event) => {
    setFeatureItems({
      ...featureItems,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddFeatures = () => {
    setFeatures([...features, featureItems]);
    setFeatureItems({
      key: "",
      value: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({
      ...form,
      gender,
      description,
      color: JSON.parse(color),
      features,
      sizes,
      images,
    });
  };

  //useEffect
  useEffect(() => {
    if (gender) {
      setSizes(
        sizes_data
          .find((g) => g.gender === gender)
          .sizes.map((item) => {
            return {
              size: item,
              stock: 0,
            };
          })
      );
    }
  }, [gender]);

  return (
    <div className="product_container">
      <h1>
        ADD NEW PRODUCT
        <hr />
      </h1>

      <form onSubmit={submitHandler}>
        {/* brand & title */}
        <fieldset>
          <legend>Headings</legend>
          <div className="split_inputs">
            <div className="input_container">
              <label htmlFor="brand">brand :</label>
              <input
                type="text"
                name="brand"
                placeholder="Enter brand"
                value={form.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="title">title :</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <span>
                Title should be 30 words maximum for better expirience and
                visibiliy
              </span>
            </div>
          </div>
        </fieldset>

        <hr />

        {/* gender & category */}
        <fieldset>
          <legend>Specifications</legend>
          <div className="split_inputs">
            <div className="input_container">
              <label htmlFor="gender">gender :</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>

                {categories &&
                  categories.map((item, i) => (
                    <option key={i} value={item.gender}>
                      {item.gender}
                    </option>
                  ))}
              </select>
              <span>
                Select gender first to select category, sizes & stocks
                visibility
              </span>
            </div>

            <div className="input_container">
              <label htmlFor="category">category :</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={form.gender === ""}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>

                {categories &&
                  gender !== "" &&
                  categories
                    .find((g) => g.gender === gender)
                    .types.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
              </select>
              <span>First select gender then only categories visible</span>
            </div>
          </div>
        </fieldset>

        <hr />

        {/* mrp & price */}
        <fieldset>
          <legend>Cost</legend>
          <div className="split_inputs">
            <div className="input_container">
              cd fr
              <label htmlFor="mrp">market rate price (MRP) :</label>
              <input
                type="number"
                name="mrp"
                placeholder="Enter mrp"
                value={form.mrp}
                onChange={handleChange}
                required
              />
              <span>write mrp and price in rupees</span>
            </div>
            <div className="input_container">
              <label htmlFor="price">price :</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                required
              />
              <span>Discount automatically reflect on product</span>
            </div>
          </div>
        </fieldset>

        <hr />

        {/* color & action */}
        <fieldset>
          <legend>Specifications</legend>
          <div className="split_inputs">
            <div className="input_container">
              <label htmlFor="color">color :</label>
              <select
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Color
                </option>

                {colorPallets &&
                  colorPallets.map((item, i) => (
                    <option key={i} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <FaSquare
                style={{
                  color:
                    color && JSON.parse(color).name === "multicolors"
                      ? "#fff"
                      : color !== "" &&
                        `rgb(${JSON.parse(color).color.R},
                    ${JSON.parse(color).color.G},
                    ${JSON.parse(color).color.B}
                  )`,
                }}
              />
            </div>

            <div className="input_container">
              <label htmlFor="action">action :</label>
              <select
                name="action"
                value={form.action}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Action
                </option>

                <option value="active">active</option>
                <option value="disable">disable</option>
              </select>
            </div>
          </div>
        </fieldset>

        <hr />

        <fieldset>
          <legend>Overview</legend>
          <div className="input_container">
            <label htmlFor="">Description :</label>
            <span>
              Description should be 150-250 words maximum for better expirience
              and visibiliy
            </span>
            <JoditEditor
              ref={editor}
              value={description}
              onChange={(prev) => setDescription(prev)}
            />
          </div>
        </fieldset>

        <hr />

        <fieldset>
          <legend>Features :</legend>

          <div className="split_inputs">
            <div className="input_container">
              <span>You can only add 8 features</span>

              <div className="split_inputs">
                <div className="input_container">
                  <label htmlFor="key">Key :</label>
                  <input
                    type="text"
                    name="key"
                    placeholder="Enter key"
                    value={featureItems.key}
                    onChange={handleChangeFeatureItem}
                  />
                </div>

                <div className="input_container">
                  <label htmlFor="value">Value :</label>
                  <input
                    type="text"
                    name="value"
                    placeholder="Enter value"
                    value={featureItems.value}
                    onChange={handleChangeFeatureItem}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddFeatures}
                  disabled={
                    featureItems.key === "" ||
                    featureItems.value === "" ||
                    features.length >= 8
                  }
                >
                  Add +
                </button>
              </div>
            </div>
          </div>

          <hr />

          {features && features.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>KEY</th>
                  <th>VALUE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {features.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.key}</td>
                    <td>{item.value}</td>
                    <td>
                      <button type="button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>No feature added yet.</span>
          )}
        </fieldset>

        <hr />

        <fieldset>
          <legend>Sizes :</legend>

          {sizes_data && gender !== "" ? (
            <table>
              <thead>
                <tr>
                  <th>SIZE (UK)</th>
                  <th>STOCK (In UNITS)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((item, i) => (
                  <tr key={i}>
                    <td>{item.size}</td>
                    <td>
                      <input
                        type="number"
                        value={item.stock}
                        max={9999}
                        min={0}
                        onChange={(e) => {
                          item.stock = +e.target.value;
                          setSizes([...sizes]);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>Select gender to add sizes and stocks.</span>
          )}
        </fieldset>

        <fieldset>
          <legend>Images :</legend>

          <div className="input_container">
            <label htmlFor="image">Images :</label>
            <span>
              You can only add 6 images and first one is feature image (reflect
              on product cart)
            </span>

            <div className="images_viewer">
              {imagePrev.map((image, i) => (
                <img key={i} src={image} alt="image" />
              ))}
            </div>

            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={images.length >= 6}
            />
          </div>
        </fieldset>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Product;

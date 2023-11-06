import React, { useState } from "react";
import axios from "axios";

export const FeedbackForm = ({ onClose, generateConfig, totalPrice }) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, phone } = formData;
    const order_config = generateConfig();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/makeOrder",
        { name, email, phone, order_config, totalPrice },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setLoading(false);
      if (response.status === 200) {
        setSent(true);
        //onClose();
        console.log("response!", response);
      } else {
        setError(
          "Не удалось отправить заявку! Пожалуйста, оформите заявку по телефону: \n8 800-555-85-42"
        );
        console.error("Error:", response);
      }
    } catch (error) {
      setError(
        "Не удалось отправить заявку! Пожалуйста, оформите заявку по телефону: \n8 800-555-85-42"
      );
      console.error("Network error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="feedback_form_wrapper">
      {!sent && !error ? (
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Имя*"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form_group">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Телефон*"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form_group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="refub_btn apply_btn"
            style={{ backgroundColor: "#0f8e49" }}
            type="submit"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      ) : (
        <>
          <div className="feedback_result_info_text">
            {error || "Ваша заявка успешно отправлена!"}
          </div>
          <div className="feedback_result_info_text">
            {!error && "Наш оператор свяжется с Вами в ближайшее время!"}
          </div>
        </>
      )}
    </div>
  );
};

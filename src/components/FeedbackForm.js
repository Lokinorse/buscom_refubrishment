import React, { useState } from "react";
import axios from "axios";

export const FeedbackForm = ({ generateConfig, totalPrice }) => {
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
      const response = await axios.post(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/makeOrder",
        { name, email, phone, order_config, totalPrice },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        console.log("response!", response);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form_group">
        <label htmlFor="name">Имя</label>
        <div className="required_dot" />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form_group">
        <label htmlFor="email">Email</label>
        <div className="required_dot" />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form_group">
        <label htmlFor="phone">Телефон</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="submit_button">
        Отправить
      </button>
    </form>
  );
};

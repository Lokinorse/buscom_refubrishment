const a = {
  b: 4,
  c: () => {
    self = this;
    console.log("priv", this.b);
  },
};

a.c();

// eslint-disable-next-line react/prop-types
const PageName = ({pageName}) => {
    return (
        <div>
                    <div
          style={{
            backgroundImage:
              "url(https://coursebuilder.thimpress.com/demo-coursify/wp-content/uploads/sites/4/2018/08/bg.jpg)",
          }}
          className=" bg-no-repeat bg-cover bg-center"
        >
          <div className="max-w-7xl bg-black bg-opacity-40 m-auto md:py-20 p-5 md:pr-36 lg:py-24 text-right">
            <div className="space-y-2 md:space-y-5">
              <h3 className="text-3xl md:text-4xl text-white lg:text-5xl font-bold">
                Welcome
              </h3>
              <p className="italic text-xl font-semibold text-white">
                Page &gt; {pageName}
              </p>
            </div>
          </div>
        </div>
        </div>
    );
};

export default PageName;
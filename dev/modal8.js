const popUp8 = (t) => {
    //! Aşağıda siteye girilen alet all ise veya istenen alet ile girildiyse kendisi açısından if blokunun çalışmasına izin veriyor
    let whichDevice =
      "ontouchstart" in document.documentElement ? "mobile" : "desktop";
    let isItOkeyAboutDevice =
      t.visitorDevice == "all" || t.visitorDevice == whichDevice;
  
    //! Aşağıda hangi sitenen gelenlere popup açılacağı belirtilmemiş ise veya belirtilen site ile gelinen sitenin string hallerinden birisi diğerini içeriyorsa kendisi açısından if blokunun çalışmasına izin veriyor
    let referrerSite = document.referrer;
    let isItOkeyAboutTrafficSource =
      !t.trafficSource ||
      (t.trafficSource &&
        referrerSite.toLowerCase().includes(t.trafficSource.toLowerCase())) ||
      (referrerSite &&
        t.trafficSource.toLowerCase().includes(referrerSite.toLowerCase()));
  
    //! if bloku ancak yukarıdaki ikisi için de sorun yoksa çalışıyor
    if (isItOkeyAboutDevice && isItOkeyAboutTrafficSource) {
      let modalSize;
      let isVisible =
        t.percentage || t.howManySecondsAfter ? "hidden" : "visible";
      let modalPosition;
      const positionFunction = (position) => {
        let str = position.x + "-" + position.y;
        if (str === "left-top") {
          return "left-3 top-3";
        } else if (str === "center-top") {
          return "left-1/2 -translate-x-1/2 top-3 ";
        } else if (str === "right-top") {
          return "right-3 top-3";
        } else if (str === "left-center") {
          return "left-3  top-1/2 -translate-y-1/2";
        } else if (str === "right-center") {
          return "right-3 top-1/2 -translate-y-1/2";
        } else if (str === "left-bottom") {
          return "left-3 bottom-3";
        } else if (str === "center-bottom") {
          return "left-1/2 -translate-x-1/2 bottom-3";
        } else if (str === "right-bottom") {
          return "right-3 bottom-3";
        } else {
          return "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2";
        }
      };
  
      modalPosition = positionFunction(t.position);
  
      if (t.size === "large") {
        modalSize = {
          outerDiv: "h-[23rem] w-[37rem]  gap-5  px-16",
          form: "gap-5",
        };
      } else if (t.size === "small") {
        modalSize = {
          outerDiv: "h-[16rem] w-[30rem] gap-1 px-4",

          form: "gap-1 px-6",
        };
      } else {
        modalSize = {
          outerDiv: "h-[18rem] w-[36rem] gap-3 px-12",
          form: "gap-3",
        };
      }
      let textColor =
      t.color === "#000000" ||
      t.color === "#7D4AEA" ||
      t.color === "#F37C34"
        ? "white"
        : "black";

      let isChecked = true
 
      let popDiv = `
      <div
      id='modalWrapper'
      class=" bg-[${t.color}] z-50 rounded-3xl shadow-lg shadow-gray-200 border border-gray-300  overflow-hidden flex flex-col justify-center items-center text-center fixed ${isVisible} ${modalSize.outerDiv} text-${textColor}  ${modalPosition}"
    >
      <h2 class="font-semibold text-3xl ">
        ${t.content[0] && t.content[0][1]}
      </h2>
      <h3 class="text-xl font-normal mb-4">
        ${t.content[1] && t.content[1][1]}
      </h3>

      <form
        id='popUpForm'
        class="flex flex-col w-full  ${modalSize.form}"
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder=${t.content[2] && t.content[2][1]}
          class="text-sm border border-${textColor} placeholder:text-${textColor} bg-[${t.color}] rounded-lg py-3 pl-2 w-full"
        />

        <input
          type="radio"
          name="policyAccept"
          id="policyAccept"
          checked=${!isChecked}
          class="hidden"
        />
        <label
          id='label'
          htmlFor="policyAccept"
          class="flex items-center"
        >
          <div
            class="w-5 h-5 ml-2 mr-3 rounded-full bg-[${t.color}] border border-${textColor} flex items-center justify-center"
          >
            <div class="w-3 h-3 rounded-full bg-${textColor} ${!isChecked && 'hidden'}"></div>
          </div>
          ${t.content[3] && t.content[3][1]}
        </label>

        <div class="flex gap-4 w-full justify-end">
          <button
            type="submit"
            class="font-semibold border-2 border-${textColor}  rounded-lg py-3 w-1/2 bg-white text-black"
          >
            ${t.content[4] && t.content[4][1]}
          </button>
        </div>
      </form>

      <button class="absolute top-3 right-3 rounded-full close-button">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="gray"
      class="w-8 h-8"
      >
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      </svg>
    </button>
    </div>`;

      let theBody = document.getElementsByTagName("body")[0];
      theBody.innerHTML += popDiv;
  
      function makeModalHidden() {
        modalWrapper.classList.remove("visible");
        modalWrapper.classList.add("hidden");
      }
  
      let popUpForm = document.getElementById("popUpForm");
      let modalWrapper = document.getElementById("modalWrapper");
  
      popUpForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        //! IT WILL BE WRİTTEN HERE WHAT IS WANTED TO HAPPEN WHEN CLICKED ON THE FORM . BUT I DID NOT ADD IT. BECAUSE WAS NOT WANTED IN THE TASK
        makeModalHidden();
      });

      let label = document.getElementById('label')
      label.addEventListener('click', ()=> {
        isChecked = !isChecked
      })
  
      let closeButtons = document.querySelectorAll(".close-button");
  
      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          makeModalHidden();
        });
      });
  
      //! Aşağıdaki isWaitingForTrigger değişkeni istenen saniye geçmesiyle ve istenen scroll yüzdesinin geçmesi iki durumunda da çalışmasını engellemk için. Bir tetikleyince öbürü tetiklemesin diye
      let isWaitingForTrigger = true;
  
      //! İstenen saniyenin geçmesiyle tetikliyor
      if (t.howManySecondsAfter) {
        let time = parseInt(t.howManySecondsAfter) * 1000;
        setTimeout(() => {
          if (isWaitingForTrigger) {
            modalWrapper.classList.remove("hidden");
            modalWrapper.classList.add("visible");
            isWaitingForTrigger = false;
          }
        }, [time]);
      }
  
      //! Her yarım saniyede bir scroll u kontrol ediyor. İstenen scroll u geçmişse ve popup tetiklenmedi ise tetikliyor ve interval e son veriyor
      if (t.percentage) {
        let scrollPercentRounded = 0;
        window.addEventListener("scroll", () => {
          let scrollTop = window.scrollY;
          let docHeight = document.body.offsetHeight;
          let winHeight = window.innerHeight;
          let scrollPercent = scrollTop / (docHeight - winHeight);
          scrollPercentRounded = Math.round(scrollPercent * 100);
        });
        const myInterval = setInterval(checkOutScroll, 500);
        function checkOutScroll() {
          if (!isWaitingForTrigger) {
            clearInterval(myInterval);
          } else if (scrollPercentRounded >= parseInt(t.percentage)) {
            modalWrapper.classList.remove("hidden");
            modalWrapper.classList.add("visible");
            isWaitingForTrigger = false;
            clearInterval(myInterval);
          }
        }
      }
    }
  
    //! EXIT INTENT TARGETING. Kullanıcı mousu browserın yukarısına götürünce çalışıyor. Aşağılara gittiğinde çalışmıyor. Çünkü gidip dönebilir. Bir de kullanıcıyı sürekli darlamaması için sadece bir defa çalışıyor. İstenildiği üzere sadece desktoplarda çalışıyor
    if (t.exitIntentTargeting && whichDevice !== "mobile") {
      let onMouseOut = (e) => {
        if (e.clientY < 50) {
          document.removeEventListener("mouseout", onMouseOut);
          modalWrapper.classList.remove("hidden");
          modalWrapper.classList.add("visible");
        }
      };
      document.addEventListener("mouseout", onMouseOut);
    }
  };
  
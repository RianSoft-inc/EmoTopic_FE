import React from "react";

export default function CollapseMenu() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="collapse collapse-arrow ring-2 ring-transparent hover:ring-indigo-400">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-base-300 text-md font-semibold peer-checked:bg-purple-400 peer-checked:text-secondary-content ">
            이모토픽이 처음이신가요?
          </div>
          <div className="collapse-content text-primary-content peer-checked:bg-purple-400 peer-checked:text-secondary-content overflow-scroll">
            {/* peer-checked 시 hover 하면 ring-transparent으로 변경 */}
            <p className="h-36">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum suscipit aliquam error quod tenetur perspiciatis
              voluptates sunt rerum expedita non accusantium maiores perferendis
              sint fugit exercitationem, quos ab! Ea. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Commodi blanditiis quo facere
              quae illo sit vel, error qui illum non esse. Commodi, molestias
              reiciendis cumque laboriosam ut ipsum fugiat mollitia.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow ring-2 ring-transparent hover:ring-indigo-400">
          <input type="checkbox" className="peer" />
          <div className="collapse-title bg-base-300 text-md font-semibold peer-checked:bg-purple-400 peer-checked:text-secondary-content">
            개인정보에 대해 알고싶다면?
          </div>
          <div className="collapse-content text-primary-content peer-checked:bg-purple-400 peer-checked:text-secondary-content overflow-scroll">
            {/* peer-checked 시 hover 하면 ring-transparent으로 변경 */}
            <p className="h-36">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              dolorum suscipit aliquam error quod tenetur perspiciatis
              voluptates sunt rerum expedita non accusantium maiores perferendis
              sint fugit exercitationem, quos ab! Ea. Lorem ipsum, dolor sit
              amet consectetur adipisicing elit. Commodi blanditiis quo facere
              quae illo sit vel, error qui illum non esse. Commodi, molestias
              reiciendis cumque laboriosam ut ipsum fugiat mollitia.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

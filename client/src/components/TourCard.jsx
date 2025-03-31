function TourCard({ title, url, description, photos, tags, onTagClick }) {
  return (
    // Tour Card
    <div className="flex w-full gap-4 items-center mt-8">
      {/* Image */}
      <div className="w-xs h-52">
        <img
          src={photos[0]}
          alt=""
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>

      <div className="">
        {/* Title */}
        <a href={url} className="font-semibold text-xl">
          {title}
        </a>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>

        {/* Read more */}
        <a href={url} className="text-sm text-blue-500 underline">
          อ่านต่อ
        </a>

        {/* Category */}
        <p className="flex flex-wrap gap-2 text-gray-700 text-sm">
          หมวด
          {tags.map((tag, index) => (
            <>
              {index > 0 && index === tags.length - 1 && <span>และ</span>}
              <span
                key={index}
                onClick={() => onTagClick(tag)}
                className="underline cursor-pointer hover:text-blue-600"
              >
                {tag}
              </span>
            </>
          ))}
        </p>

        {/* Small Images */}
        <div className="flex gap-4 p-4">
          {photos.slice(1, 4).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt=""
              className="w-20 h-20 object-cover rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default TourCard;

import ParallaxContainer from "./components/parallax";

export default function Home() {
  return (
   <div>
    <ParallaxContainer>
      {/* Add your content here */}
      <div>
        <div className="w-full h-screen">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" // A sample image from the web
            alt="A beautiful landscape"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </ParallaxContainer>
   </div>
  );
}

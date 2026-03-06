export default function PageWrapper({ children }) {
  return (
    <main className="bg-background text-text bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVb_2XjQkFjGZNJogltKE9HnAX3in5ppm0Q&s')" }}>
      {children}
    </main>
  );
}

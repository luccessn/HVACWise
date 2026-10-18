/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./useWindowSize";

const Accardion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="p-4 bg-indigo-600">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden">
        {items.map((item) => (
          <Panel key={item.id} {...item} open={open} setOpen={setOpen} />
        ))}
      </div>
    </section>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;
  const isDesktop = width > 1024;

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setOpen(id)}
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r border-b border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
      >
        <span
          style={{ writingMode: "vertical-lr" }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>

        <span className="block lg:hidden text-xl font-light">{title}</span>

        <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
          <Icon />
        </div>

        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r border-b lg:border-b-0 lg:border-t border-slate-200 rotate-45 absolute bottom-0 lg:bottom-1/2 right-1/2 lg:right-0 translate-y-1/2 translate-x-1/2 z-20" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={isDesktop ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
    transition: { duration: 0.4 },
  },
  closed: {
    width: "0%",
    height: "100%",
    transition: { duration: 0.3 },
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
    transition: { duration: 0.4 },
  },
  closed: {
    width: "100%",
    height: "0px",
    transition: { duration: 0.3 },
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: { delay: 0.125 },
  },
  closed: {
    opacity: 0,
    y: "100%",
  },
};

const items = [
  {
    id: 1,
    title: "Earn more",
    Icon: FiDollarSign,
    imgSrc:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1740&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
  },
  {
    id: 2,
    title: "Play more",
    Icon: FiPlay,
    imgSrc:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=688&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
  },
  {
    id: 3,
    title: "Keep track",
    Icon: FiBell,
    imgSrc:
      "https://images.unsplash.com/photo-1578450671530-5b6a7c9f32a8?auto=format&fit=crop&w=870&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
  },
  {
    id: 4,
    title: "Grow faster",
    Icon: FiBarChart,
    imgSrc:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1740&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
  },
];

export default Accardion;

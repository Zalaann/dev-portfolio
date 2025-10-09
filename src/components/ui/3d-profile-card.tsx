"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

export default function ProfileCard() {
  return (
    <CardContainer containerClassName="py-0">
      <CardBody className="bg-transparent relative [transform-style:preserve-3d] h-auto w-auto">
        <CardItem translateZ="80" className="relative w-28 h-28 sm:w-40 md:w-48 sm:h-40 md:h-48 mx-auto group">
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-[2px] z-0 overflow-hidden"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="absolute inset-[1px] rounded-2xl bg-background/98 backdrop-blur-md z-10" />
          <div className="relative w-full h-full p-2 sm:p-3 z-20">
            <motion.div
              className="w-full h-full rounded-xl overflow-hidden relative"
              whileHover={{ 
                scale: 1.05,
                translateZ: 30, 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/profile.jpg"
                alt="Muhammad Ibrahim Tariq"
                width={192}
                height={192}
                className="object-cover w-full h-full"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
} 
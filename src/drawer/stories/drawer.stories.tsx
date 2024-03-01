import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Drawer } from "../drawer";
import { Lorem } from "../../storybookUtils";
import { Button } from "../../button";

const Component = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Lorem paragraphs={2} />
      </Drawer>
    </>
  );
};

const meta: Meta<typeof Component> = {
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Primary: Story = {};

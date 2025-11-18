import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";

import packageConfig from "../../packages/wonder-blocks-modal/package.json";
import ComponentInfo from "../components/component-info";
import {allModes} from "../../.storybook/modes";

type Student = {
    id: string;
    name: string;
    progress: number;
};

const mockStudents: Array<Student> = [
    {id: "1", name: "Alice Smith", progress: 85},
    {id: "2", name: "Bob Johnson", progress: 70},
    {id: "3", name: "Charlie Brown", progress: 95},
];

export default {
    title: "Packages / Modal / ModalLauncher / Focus Management",
    component: ModalLauncher,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        docs: {
            description: {
                component:
                    "Stories demonstrating focus management patterns with ModalLauncher, particularly when modals are opened from tables or lists.",
            },
            source: {
                excludeDecorators: true,
            },
        },
        chromatic: {
            modes: {
                small: allModes.small,
                large: allModes.large,
            },
            disableSnapshot: true,
        },
    },
} as Meta<typeof ModalLauncher>;

type StoryComponentType = StoryObj<typeof ModalLauncher>;

type CompletionModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    returnFocusToId: string | null;
};

// Separate modal component to match the pattern in consumer code
const CompletionModal = ({
    isOpen,
    handleClose,
    returnFocusToId,
}: CompletionModalProps) => {
    return (
        <ModalLauncher
            opened={isOpen}
            onClose={handleClose}
            closedFocusId={returnFocusToId || undefined}
            modal={() => (
                <OnePaneDialog
                    title="Unit: Sample Unit"
                    content={
                        <View style={styles.modalContent}>
                            <Heading size="small">
                                Student Progress Data
                            </Heading>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <BodyText style={styles.tableCell}>
                                        Student
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Progress
                                    </BodyText>
                                </View>
                                {mockStudents.map((student) => (
                                    <View
                                        key={student.id}
                                        style={styles.tableRow}
                                    >
                                        <BodyText style={styles.tableCell}>
                                            {student.name}
                                        </BodyText>
                                        <BodyText style={styles.tableCell}>
                                            {student.progress}%
                                        </BodyText>
                                    </View>
                                ))}
                            </View>
                        </View>
                    }
                    style={styles.modal}
                />
            )}
        />
    );
};

// Container component to manage state, similar to consumer repository pattern
const CompletionModalContainer = () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
    const [modalTriggerId, setModalTriggerId] = React.useState<string | null>(
        null,
    );

    const handleOpenModal = (triggerId: string) => {
        setModalTriggerId(triggerId);
        setSelectedItem("sample-item");
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setModalTriggerId(null);
    };

    return (
        <View style={styles.container}>
            <BodyText>
                Main table with completion buttons. When you click a button to
                open the modal and then close it, focus should return to the
                button that opened it.
            </BodyText>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <BodyText style={styles.tableCell}>Student</BodyText>
                    <BodyText style={styles.tableCell}>Actions</BodyText>
                </View>
                {mockStudents.map((student) => {
                    const triggerId = `completion-modal-trigger-${student.id}`;
                    return (
                        <View key={student.id} style={styles.tableRow}>
                            <BodyText style={styles.tableCell}>
                                {student.name}
                            </BodyText>
                            <View style={styles.tableCell}>
                                <Button
                                    id={triggerId}
                                    onClick={() => handleOpenModal(triggerId)}
                                    size="small"
                                >
                                    {`${student.progress}%`}
                                </Button>
                            </View>
                        </View>
                    );
                })}
            </View>
            {selectedItem && (
                <CompletionModal
                    isOpen={true}
                    handleClose={handleCloseModal}
                    returnFocusToId={modalTriggerId}
                />
            )}
        </View>
    );
};

/**
 * This story demonstrates the focus management pattern from the consumer
 * repository where a modal is opened from a table row button. The modal
 * component is separate and uses closedFocusId to return focus to the
 * triggering button.
 */
export const CompletionModalPattern: StoryComponentType = {
    render: () => <CompletionModalContainer />,
    parameters: {
        docs: {
            description: {
                story: "This pattern shows how to handle focus management when a modal is opened from a table. Each button in the table opens the same modal with different context. When the modal closes, focus should return to the button that opened it using the `closedFocusId` prop.",
            },
        },
    },
};

// Single ModalLauncher with conditional dialog content
const SingleModalLauncherContainer = () => {
    const [selectedItem, setSelectedItem] = React.useState<{
        type: "content" | "mastery";
        id: string;
    } | null>(null);
    const [modalTriggerId, setModalTriggerId] = React.useState<string | null>(
        null,
    );

    const handleOpenModal = (
        type: "content" | "mastery",
        triggerId: string,
        studentId: string,
    ) => {
        setModalTriggerId(triggerId);
        setSelectedItem({type, id: studentId});
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setModalTriggerId(null);
    };

    const selectedStudent = mockStudents.find((s) => s.id === selectedItem?.id);

    const conditionalModal = React.useMemo(() => {
        if (selectedItem?.type === "content") {
            return (
                <OnePaneDialog
                    title={`Content Assignment: ${selectedStudent?.name}`}
                    content={
                        <View style={styles.modalContent}>
                            <Heading size="small">
                                Content completion details
                            </Heading>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <BodyText style={styles.tableCell}>
                                        Metric
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Value
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Completed On
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        11/15/24, 2:30 PM
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Attempts
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        3
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Best Score
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        {selectedStudent?.progress}%
                                    </BodyText>
                                </View>
                            </View>
                        </View>
                    }
                    style={styles.modal}
                />
            );
        }

        if (selectedItem?.type === "mastery") {
            return (
                <OnePaneDialog
                    title={`Unit Mastery: ${selectedStudent?.name}`}
                    content={
                        <View style={styles.modalContent}>
                            <Heading size="small">
                                Mastery progress details
                            </Heading>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <BodyText style={styles.tableCell}>
                                        Skill
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Level
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Algebra Basics
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Practiced
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Linear Equations
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Mastered
                                    </BodyText>
                                </View>
                                <View style={styles.tableRow}>
                                    <BodyText style={styles.tableCell}>
                                        Systems of Equations
                                    </BodyText>
                                    <BodyText style={styles.tableCell}>
                                        Familiar
                                    </BodyText>
                                </View>
                            </View>
                        </View>
                    }
                    style={styles.modal}
                />
            );
        }

        return null;
    }, [selectedItem, selectedStudent]);

    return (
        <View style={styles.container}>
            <BodyText>
                Click buttons to open different modal types from the same
                ModalLauncher. Focus should return to the button that opened the
                modal when it closes.
            </BodyText>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <BodyText style={styles.tableCell}>Student</BodyText>
                    <BodyText style={styles.tableCell}>
                        Content Progress
                    </BodyText>
                    <BodyText style={styles.tableCell}>
                        Mastery Progress
                    </BodyText>
                </View>
                {mockStudents.map((student) => {
                    const contentTriggerId = `content-modal-trigger-${student.id}`;
                    const masteryTriggerId = `mastery-modal-trigger-${student.id}`;
                    return (
                        <View key={student.id} style={styles.tableRow}>
                            <BodyText style={styles.tableCell}>
                                {student.name}
                            </BodyText>
                            <View style={styles.tableCell}>
                                <Button
                                    id={contentTriggerId}
                                    onClick={() =>
                                        handleOpenModal(
                                            "content",
                                            contentTriggerId,
                                            student.id,
                                        )
                                    }
                                    size="small"
                                    kind="secondary"
                                >
                                    View Details
                                </Button>
                            </View>
                            <View style={styles.tableCell}>
                                <Button
                                    id={masteryTriggerId}
                                    onClick={() =>
                                        handleOpenModal(
                                            "mastery",
                                            masteryTriggerId,
                                            student.id,
                                        )
                                    }
                                    size="small"
                                    kind="tertiary"
                                >
                                    {`${student.progress}%`}
                                </Button>
                            </View>
                        </View>
                    );
                })}
            </View>
            <ModalLauncher
                opened={!!selectedItem}
                onClose={handleCloseModal}
                closedFocusId={modalTriggerId || undefined}
                modal={conditionalModal}
            />
        </View>
    );
};

/**
 * This story demonstrates using a single ModalLauncher with conditional
 * dialog content. The modal content changes based on which button was
 * clicked, but focus management is handled by a single ModalLauncher.
 */
export const SingleModalWithConditionalContent: StoryComponentType = {
    render: () => <SingleModalLauncherContainer />,
    parameters: {
        docs: {
            description: {
                story: "This pattern shows how to use a single ModalLauncher to display different modal content based on user interaction. Multiple buttons in the table can open different modal types, but they all use the same ModalLauncher instance. Focus returns correctly to the triggering button using `closedFocusId`.",
            },
        },
    },
};

const styles = StyleSheet.create({
    example: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: sizing.size_240,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_240,
        width: "100%",
    },
    table: {
        display: "flex",
        flexDirection: "column",
        borderColor: semanticColor.core.border.neutral.subtle,
        borderStyle: "solid",
        borderWidth: border.width.thin,
        borderRadius: border.radius.radius_040,
        overflow: "hidden",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: semanticColor.core.background.neutral.subtle,
        borderBottomColor: semanticColor.core.border.neutral.subtle,
        borderBottomStyle: "solid",
        borderBottomWidth: border.width.thin,
        padding: sizing.size_160,
        fontWeight: "bold",
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
        borderBottomColor: semanticColor.core.border.neutral.subtle,
        borderBottomStyle: "solid",
        borderBottomWidth: border.width.thin,
        padding: sizing.size_160,
        ":last-child": {
            borderBottomWidth: 0,
        },
    },
    tableCell: {
        flex: 1,
        display: "flex",
        alignItems: "center",
    },
    modal: {
        minInlineSize: "80vw",
    },
    modalContent: {
        display: "flex",
        flexDirection: "column",
        gap: sizing.size_240,
        padding: sizing.size_160,
    },
});

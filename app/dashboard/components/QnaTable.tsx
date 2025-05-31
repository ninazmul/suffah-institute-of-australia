/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import { deleteQna, updateAnswer } from "@/lib/actions/qna.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const QnaTable = ({
  qna,
}: {
  qna: Array<{
    _id: string;
    email: string;
    question: string;
    answer?: string;
    questionLikes: {
      count: number;
      likedBy: string[];
    };
    answerLikes: {
      count: number;
      likedBy: string[];
    };
  }>;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [modalData, setModalData] = useState<{
    id: string;
    question: string;
    initialAnswer: string;
  } | null>(null);
  const [modalAnswer, setModalAnswer] = useState("");

  const filteredQna = useMemo(() => {
    return qna.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false)
    );
  }, [qna, searchQuery]);

  const paginatedQna = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQna.slice(start, start + itemsPerPage);
  }, [filteredQna, currentPage, itemsPerPage]);

  const handleDeleteQna = async (qnaId: string) => {
    try {
      const response = await deleteQna(qnaId);
      if (response) {
        toast.success(response.message);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete QnA");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const openQnaModal = (qna: {
    _id: string;
    question: string;
    answer?: string;
  }) => {
    setModalData({
      id: qna._id,
      question: qna.question,
      initialAnswer: qna.answer || "",
    });
    setModalAnswer(qna.answer || "");
  };

  const handleSaveAnswer = async () => {
    if (!modalData) return;

    try {
      await updateAnswer(modalData.id, modalAnswer);
      toast.success("Answer saved successfully");
      setModalData(null);
      router.refresh();
    } catch (error) {
      toast.error("Failed to save answer");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search by question or answer"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full md:w-1/2 lg:w-1/3 border border-gray-300 rounded px-3 py-2"
      />
      <Table className="border border-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Question Likes</TableHead>
            <TableHead>Answer Likes</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedQna.map((qna, index) => (
            <TableRow key={qna._id} className="hover:bg-gray-100">
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>

              <TableCell>
                <span
                  className="line-clamp-1 cursor-pointer hover:underline"
                  onClick={() => openQnaModal(qna)}
                >
                  {qna.question}
                </span>
              </TableCell>

              <TableCell>
                {qna.answer ? (
                  <span
                    className="line-clamp-1 cursor-pointer hover:underline"
                    onClick={() => openQnaModal(qna)}
                  >
                    {qna.answer}
                  </span>
                ) : (
                  <Button size="sm" onClick={() => openQnaModal(qna)}>
                    Give Answer
                  </Button>
                )}
              </TableCell>

              <TableCell>{qna.questionLikes.count}</TableCell>
              <TableCell>{qna.answerLikes.count}</TableCell>
              <TableCell>
                <a
                  href={`mailto:${qna.email}`}
                  className="text-blue-800 font-semibold underline"
                  target="_blank"
                >
                  <Mail />
                </a>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => setConfirmDeleteId(qna._id)}
                  variant="outline"
                  className="text-red-500"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">
          Showing {Math.min(itemsPerPage * currentPage, filteredQna.length)} of{" "}
          {filteredQna.length} QnAs
        </span>
        <div className="flex items-center space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={
              currentPage === Math.ceil(filteredQna.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md space-y-4 w-full max-w-sm">
            <p>Are you sure you want to delete this QnA?</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setConfirmDeleteId(null)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteQna(confirmDeleteId)}
                variant="destructive"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* QnA View + Answer Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md space-y-4 w-full max-w-2xl">
            <h2 className="text-lg font-semibold">Full Question</h2>
            <p className="border p-2 rounded text-sm whitespace-pre-line">
              {modalData.question}
            </p>

            <h2 className="text-lg font-semibold">Answer</h2>
            <Textarea
              value={modalAnswer}
              onChange={(e) => setModalAnswer(e.target.value)}
              rows={5}
              className="w-full resize-none"
              placeholder="Write your answer here..."
            />

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setModalData(null)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSaveAnswer}>
                {modalData.initialAnswer ? "Update Answer" : "Save Answer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnaTable;
